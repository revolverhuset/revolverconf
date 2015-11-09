extern crate hyper;
extern crate rustc_serialize;
extern crate csv;
extern crate handlebars;

use std::io;
use std::io::Read;

use handlebars::Handlebars;
use std::collections::BTreeMap;

use hyper::Client;
use hyper::header::Connection;

use rustc_serialize::json::{Json, ToJson};

#[derive(RustcDecodable)]
struct Speaker {
	name: String,
	company: String,
	topics: Vec<String>,
}

impl Speaker {
	fn full_of_data(&self) -> bool {
		if self.name.is_empty() { return false; }
		if self.company.is_empty() { return false; }
		if self.topics.len() < 1 { return false; }
		if self.topics[0].is_empty() { return false; }

		return true;
	}
}

struct SpeakerData {
	img: String,
	name: String,
	company: String,
	topics: Vec<String>,
}

impl ToJson for SpeakerData {
	fn to_json(&self) -> Json {
		let mut data = BTreeMap::<String, Json>::new();
		data.insert("img".to_string(), self.img.to_json());
		data.insert("name".to_string(), self.name.to_json());
		data.insert("company".to_string(), self.company.to_json());
		data.insert("topics".to_string(), self.topics.to_json());
		data.to_json()
	}
}

fn load_template(name: &str) -> io::Result<String> {
	let path = std::path::Path::new(name);

	let mut file = try!(std::fs::File::open(path));
	let mut s = String::new();
	try!(file.read_to_string(&mut s));
	Ok(s)
}

fn main() {
	let mut handlebars = Handlebars::new();
	let template = load_template("./template.hbs").ok().unwrap();
	handlebars.register_template_string("template", template).ok().unwrap();

	let client = Client::new();
	let mut res = client.get("https://docs.google.com/spreadsheets/d/1byRny3-c_eeUnSOk2M4ZFnpeXkb9tzDv4q16LtpEYp0/pub?gid=0&single=true&output=csv")
		.header(Connection::close())
		.send().unwrap();

	let mut body = String::new();
	res.read_to_string(&mut body).unwrap();

	let mut rdr = csv::Reader::from_string(body);
	let speakers = rdr.decode()
		.collect::<csv::Result<Vec<Speaker>>>().unwrap()
		.into_iter().filter(|x| x.full_of_data()).collect::<Vec<_>>();

	let mut index = 0;
	let speaker_data = speakers.into_iter()
		.map(|x| {
			let img = format!("skull{}.svg", index % 4 + 1);
			index += 1;
			SpeakerData {
				img: img,
				name: x.name,
				company: x.company,
				topics: x.topics.into_iter().filter(|x| !x.is_empty()).collect::<Vec<_>>()
			}
		}).collect::<Vec<_>>();

	let mut data = BTreeMap::<String, Json>::new();
	data.insert("speakers".to_string(), speaker_data.to_json());

	print!("Content-Type: text/html;charset=utf-8\n\n{}", handlebars.render("template", &data).unwrap());
}
