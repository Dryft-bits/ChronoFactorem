import { Component } from "react";
import React from "react";

import PreviewTT from "./PreviewTT.jsx";
import MidsemSched from "./MidsemSched.jsx";
import CompreSched from "./CompreSched.jsx";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

class ExportPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const timetableComp = document.getElementById("timetable-pdf");
    const pageHeight = timetableComp.offsetHeight;
    const pageWidth = timetableComp.offsetWidth;
    const midsemComp = document.getElementById("midsem-pdf");
    const compreComp = document.getElementById("compre-pdf");
    const pdf = new jsPDF('landscape', 'px', [pageWidth, pageHeight]);
    const a = html2canvas(timetableComp);
    const b = html2canvas(midsemComp);
    const c = html2canvas(compreComp);
    a.then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 5, 8);
      // }).then(() => {
      //   b.then((canvas) => {
      //     const imgData = canvas.toDataURL('image/png');
      //     pdf.addImage(imgData, 'PNG', 5, 8);
      //   })
      // }).then(() => {
      //   c.then((canvas) => {
      //     const imgData = canvas.toDataURL('image/png');
      //     pdf.addImage(imgData, 'PNG', 5, 8);
      //   })
    }).then(() => {
      pdf.save('timetable.pdf');
    }).then(() => {
      document.getElementById('0').click();
    });
  }

  render() {
    return (<div id="export-page">
      <div id="timetable-pdf" >
        <PreviewTT />
      </div>
      <div id="midsem-pdf">
        <h3>MidSem</h3>
        <MidsemSched id="midsem-pdf" />
      </div>
      <div id="compre-pdf">
        <h3>Compre</h3>
        <CompreSched id="compre-pdf" />
      </div>
    </div>)
  }
}

export default ExportPage;
