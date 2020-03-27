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
    const secondPageOffset = midsemComp.offsetHeight;
    const compreComp = document.getElementById("compre-pdf");
    const pdf = new jsPDF('landscape', 'px',
      [pageHeight, pageWidth]
    );
    const a = html2canvas(timetableComp);
    const b = html2canvas(midsemComp);
    const c = html2canvas(compreComp);
    Promise.all([a, b, c]).then((canvases) => {
      const imgData1 = canvases[0].toDataURL('image/png');
      console.log(imgData1);
      const imgData2 = canvases[1].toDataURL('image/png');
      const imgData3 = canvases[2].toDataURL('image/png');
      pdf.addImage(imgData1, 'PNG', 0, 0);
      pdf.addPage();
      pdf.addImage(imgData2, 'PNG', 64, 32);
      pdf.addImage(imgData3, 'PNG', 64, 64 + secondPageOffset);
      pdf.save('timetable.pdf');
    }).then(() => {
      document.getElementById('0').click();
    })
  }

  render() {
    return (<div id="export-page">
      <div id="timetable-pdf" >
        <PreviewTT />
      </div>
      <div id="midsem-pdf">
        <h3 style={{ textAlign: "center" }}>MidSem</h3>
        <MidsemSched id="midsem-pdf" />
      </div>
      <div id="compre-pdf" style={{ textAlign: "center" }}>
        <h3 >Compre</h3>
        <CompreSched id="compre-pdf" />
      </div>
    </div>)
  }
}

export default ExportPage;
