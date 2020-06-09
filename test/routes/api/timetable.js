const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
let chai = require("chai"),
  expect = chai.expect;
let chaiHttp = require("chai-http");
const server = require("../../../server/server.js");

chai.use(chaiHttp);

describe("TimeTable api tests", function () {
  it("/save works with correct requests", async function () {
    server.request.isAuthenticated = function () {
      return true;
    };
    var requestData = JSON.parse(
      '{"id":null,"name":"timie timie","timetable":{"M":{"one":{"courseCode":["BIO F111"],"courseName":"General Biology","sectionRoom":"F207","numHours":1,"section":"T4"},"two":{},"three":{"courseCode":["BIO F111"],"courseName":"General Biology","sectionRoom":"F104","numHours":1,"section":"L1"},"four":{},"five":{},"six":{},"seven":{},"eight":{},"nine":{},"ten":{}},"T":{"one":{},"two":{},"three":{"courseCode":["BIO F341"],"courseName":"Developmental Biology","sectionRoom":"G103","numHours":1,"section":"L1"},"four":{},"five":{},"six":{},"seven":{"courseCode":["CS F212"],"courseName":"Data Base Systems","sectionRoom":"D311","numHours":2,"section":"P3"},"eight":{"courseCode":["CS F212"],"courseName":"Data Base Systems","sectionRoom":"D311","numHours":2,"section":"P3"},"nine":{},"ten":{}},"W":{"one":{"courseCode":["BIO F341"],"courseName":"Developmental Biology","sectionRoom":"F203","numHours":1,"section":"T1"},"two":{},"three":{"courseCode":["BIO F111"],"courseName":"General Biology","sectionRoom":"F104","numHours":1,"section":"L1"},"four":{},"five":{},"six":{},"seven":{},"eight":{},"nine":{},"ten":{}},"Th":{"one":{},"two":{},"three":{"courseCode":["BIO F341"],"courseName":"Developmental Biology","sectionRoom":"G103","numHours":1,"section":"L1"},"four":{},"five":{},"six":{},"seven":{},"eight":{},"nine":{},"ten":{}},"F":{"one":{},"two":{},"three":{"courseCode":["BIO F111"],"courseName":"General Biology","sectionRoom":"F104","numHours":1,"section":"L1"},"four":{"courseCode":["BIO F110"],"courseName":"Biology Laboratory","sectionRoom":"A122","numHours":2,"section":"L1"},"five":{"courseCode":["BIO F110"],"courseName":"Biology Laboratory","sectionRoom":"A122","numHours":2,"section":"L1"},"six":{},"seven":{},"eight":{},"nine":{},"ten":{}},"S":{"one":{"courseCode":["CS F212"],"courseName":"Data Base Systems","sectionRoom":"G106","numHours":1,"section":"T2"},"two":{},"three":{"courseCode":["BIO F341"],"courseName":"Developmental Biology","sectionRoom":"G103","numHours":1,"section":"L1"},"four":{},"five":{},"six":{},"seven":{},"eight":{},"nine":{},"ten":{}}},"courses":[{"course":{"BIO F110":{"name":"Biology Laboratory","sections":{"L1":{"instructors":["Gireesha T Mohannath"],"sched":[{"room":"A122","days":["F"],"hours":[4,5]}]},"L2":{"instructors":["Minali Singh"],"sched":[{"room":"A122","days":["Th"],"hours":[4,5]}]},"L3":{"instructors":["Vidya Rajesh"],"sched":[{"room":"A122","days":["T"],"hours":[4,5]}]},"L4":{"instructors":["PIYUSH KHANDELIA"],"sched":[{"room":"A122","days":["M"],"hours":[4,5]}]},"L5":{"instructors":["Aishwarya Natarajan"],"sched":[{"room":"A122","days":["W"],"hours":[4,5]}]},"L6":{"instructors":["Anne Lohitha Alias Anuhya"],"sched":[{"room":"A122","days":["T"],"hours":[7,8]}]},"L7":{"instructors":["Vivek Sharma"],"sched":[{"room":"A122","days":["M"],"hours":[7,8]}]},"L8":{"instructors":["Aruku Dazo Vadeo"],"sched":[{"room":"A122","days":["F"],"hours":[7,8]}]},"L9":{"instructors":["Piyush Khandelia"],"sched":[{"room":"A122","days":["W"],"hours":[7,8]}]},"L10":{"instructors":["Bakhya Shree Gb"],"sched":[{"room":"A122","days":["S"],"hours":[4,5]}]},"L11":{"instructors":["Anne Lohitha Alias Anuhya"],"sched":[{"room":"A122","days":["Th"],"hours":[7,8]}]}},"compre":{"date":"30/04","session":"FN"}}},"sections":["L1"]},{"course":{"BIO F111":{"name":"General Biology","sections":{"L1":{"instructors":["Pragya Komal","Suman Kapur"],"sched":[{"room":"F104","days":["M","W","F"],"hours":[3]}]},"L2":{"instructors":["K  PRANAV NARAYAN","Naga Mohan K"],"sched":[{"room":"F102","days":["M","W","F"],"hours":[9]}]},"T1":{"instructors":["Debashree B"],"sched":[{"room":"F203","days":["M"],"hours":[1]}]},"T2":{"instructors":["P Sankar Ganesh"],"sched":[{"room":"G204","days":["M"],"hours":[1]}]},"T3":{"instructors":["Pragya Komal"],"sched":[{"room":"F201","days":["M"],"hours":[1]}]},"T4":{"instructors":["Vidya Rajesh"],"sched":[{"room":"F207","days":["M"],"hours":[1]}]},"T5":{"instructors":["Ruchi Jain Dey"],"sched":[{"room":"F202","days":["M"],"hours":[1]}]},"T6":{"instructors":["K  Pranav Narayan"],"sched":[{"room":"G208","days":["M"],"hours":[1]}]},"T7":{"instructors":["K  Pranav Narayan"],"sched":[{"room":"F201","days":["W"],"hours":[6]}]},"T8":{"instructors":["Suman Kapur"],"sched":[{"room":"G206","days":["M"],"hours":[1]}]},"T9":{"instructors":["Naga Mohan K"],"sched":[{"room":"G202","days":["M"],"hours":[1]}]}},"compre":{"date":"11/05","session":"AN"},"midsem":{"date":"5/3","time":"1.30 -3.00 PM"}}},"sections":["L1","T4"]},{"course":{"BIO F341":{"name":"Developmental Biology","sections":{"L1":{"instructors":["K  PRANAV NARAYAN","Vivek Sharma"],"sched":[{"room":"G103","days":["T","Th","S"],"hours":[3]}]},"T1":{"instructors":["Vivek Sharma"],"sched":[{"room":"F203","days":["W"],"hours":[1]}]}},"compre":{"date":"06/05","session":"AN"},"midsem":{"date":"4/3","time":"9.00 - 10.30AM"}}},"sections":["L1","T1"]},{"course":{"CS F212":{"name":"Data Base Systems","sections":{"L1":{"instructors":["R GURURAJ"],"sched":[{"room":"F102","days":["M","W","F"],"hours":[5]}]},"P1":{"instructors":["Lov Kumar","Deepa Kumari"],"sched":[{"room":"D311","days":["M"],"hours":[2,3]}]},"P2":{"instructors":["Lov Kumar"],"sched":[{"room":"D311","days":["W"],"hours":[2,3]}]},"P3":{"instructors":["R Gururaj","Deepa Kumari"],"sched":[{"room":"D311","days":["T"],"hours":[7,8]}]},"P4":{"instructors":["R Gururaj","Ramisetty Kavya"],"sched":[{"room":"D311","days":["F"],"hours":[2,3]}]},"P5":{"instructors":["Jabez J Christopher","Ramisetty Kavya"],"sched":[{"room":"D311","days":["Th"],"hours":[7,8]}]},"T1":{"instructors":["Lov Kumar"],"sched":[{"room":"G105","days":["S"],"hours":[1]}]},"T2":{"instructors":["R Gururaj"],"sched":[{"room":"G106","days":["S"],"hours":[1]}]},"T3":{"instructors":["Jabez J Christopher"],"sched":[{"room":"G107","days":["S"],"hours":[1]}]}},"compre":{"date":"14/05","session":"FN"},"midsem":{"date":"7/3","time":"9.00 - 10.30AM"}}},"sections":["T2","P3"]}]}'
    );
    chai
      .request(server)
      .post("/api/timetable/save")
      .send(requestData)
      .end(function (err, res) {
        expect(res.status).to.be.equal(200);
      });
  });

  it("/save does not allow empty requests", async function () {
    server.request.isAuthenticated = function () {
      return true;
    };

    chai
      .request(server)
      .post("/api/timetable/save")
      .end(function (err, res) {
        expect(res.status).to.be.equal(422);
      });
  });

  it("/save does not allow malformed requests 1", async function () {
    server.request.isAuthenticated = function () {
      return true;
    };

    const requestData = { dsfjndfd: "fdsfed" };
    chai
      .request(server)
      .post("/api/timetable/save")
      .send(requestData)
      .end(function (err, res) {
        expect(res.status).to.be.equal(422);
      });
  });

  it("/save does not allow malformed requests 2", async function () {
    server.request.isAuthenticated = function () {
      return true;
    };

    var requestData = JSON.parse('{"id":null,"name":"timie timie"}');
    chai
      .request(server)
      .post("/api/timetable/save")
      .send(requestData)
      .end(function (err, res) {
        expect(res.status).to.be.equal(422);
      });
  });
});
