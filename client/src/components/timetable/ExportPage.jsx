import { Component } from 'react';
import React from 'react';

import PreviewTT from './PreviewTT.jsx';
import MidsemSched from './MidsemSched.jsx';
import CompreSched from './CompreSched.jsx';

import html2canvas from 'html2canvas';

class ExportPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const pageToExport = document.getElementById('export-page');
    html2canvas(pageToExport)
      .then(canvas => {
        const imgData = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');
        window.open(imgData, '_blank');
        document.getElementById('image').href = imgData;
        document.getElementById('image').download = 'time.png';
        document.getElementById('image').click();
      })
      .then(() => {
        document.getElementById('0').click();
      });
  }

  render() {
    return (
      <>
        <div id="export-page">
          <div id="myMm" style={{ height: '1mm' }} />
          <PreviewTT />
          <h3>MidSem</h3>
          <MidsemSched />
          <h3>Compre</h3>
          <CompreSched />
        </div>
        <a id="image"></a>
      </>
    );
  }
}

export default ExportPage;
