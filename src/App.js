// import logo from './logo.svg';
import './App.css';
import React from "react";
// import { PDFViewer, EventBus } from "pdfjs-dist/web/pdf_viewer"
// import Toolbar from "./com/Toolbar"
import Viewer from "./com/Viewer"
import Toolbar from "./com/Toolbar"

import { Modal, Button, Row, Col } from 'antd';
// import pdfjs from "pdfjs-dist/webpack"
const pdfjsLib = require('pdfjs-dist/webpack')
// const PDFViewer = require('pdfjs-dist/web/pdf_viewer.js')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false,
      scale: 1
    }
  }
  componentDidMount() {

    // loadingTask.promise.then(function (pdf) {
    //   console.log(pdf)
    //   pdf.getPage(1).then(function (page) {
    //     console.log(page)
    //     // you can now use *page* here
    //     var scale = 1.5;
    //     var viewport = page.getViewport({ scale: scale, });
    //     // Support HiDPI-screens.
    //     var outputScale = window.devicePixelRatio || 1;

    //     var canvas = document.getElementById('the-canvas');
    //     var context = canvas.getContext('2d');

    //     canvas.width = Math.floor(viewport.width * outputScale);
    //     canvas.height = Math.floor(viewport.height * outputScale);
    //     canvas.style.width = Math.floor(viewport.width) + "px";
    //     canvas.style.height = Math.floor(viewport.height) + "px";

    //     var transform = outputScale !== 1
    //       ? [outputScale, 0, 0, outputScale, 0, 0]
    //       : null;

    //     var renderContext = {
    //       canvasContext: context,
    //       transform: transform,
    //       viewport: viewport
    //     };
    //     page.render(renderContext);
    //   });

    //   // you can now us
  }
  zoomIn(e) {
    let newScale = this.viewerr.state.scale * 1.1
    this.viewerr.setState({ scale: newScale });
    this.toolbar.setState({ scale: newScale })
  }
  zoomOut(e) {
    let newScale = this.viewerr.state.scale / 1.1
    this.viewerr.setState({ scale: newScale });
    this.toolbar.setState({ scale: newScale })
  }
  zoom(e) {
    let newScale = e
    this.viewerr.setState({ scale: newScale });
  }

  showModal = () => {
    this.setState({ isModalVisible: true },)
    // var loadingTask = pdfjsLib.getDocument({ data: this.props.url })
    var loadingTask = pdfjsLib.getDocument(this.props.url)
    loadingTask.promise.then((doc) => {
      console.log(`Document ${this.props.url} loaded ${doc.numPages} page(s)`);
      console.log(doc)
     




      this.viewerr.setState({ doc, });
      this.toolbar.setState({ numPages: doc.numPages })
    }, (reason) => {
      console.error(`Error during ${this.props.url} loading: ${reason}`);
    });

  };

  handleOk = () => { this.setState({ isModalVisible: false }) };
  handleCancel = () => { this.setState({ isModalVisible: false }) };

  render() {
    // console.log(this.state.scale)
    return (
      <div className="App">
        {/* <div className="App-header">
          <h2>Welcome to PDF.js</h2>
        </div> */}


        <Button type="primary" onClick={this.showModal} >
          Open Modal
        </Button>

        <Modal
          title="Basic Modal"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          bodyStyle={{ width: 900, height: 700 }}
          centered={true}
        >
          <Toolbar
            // scale={this.state.scale}
            ref={(ref) => this.toolbar = ref}
            onZoomIn={(e) => this.zoomIn(e)}
            onZoomOut={(e) => this.zoomOut(e)}
            onZoom={(e) => this.zoom(e)}
          >

          </Toolbar>
          <Row>
            <Col span={20}>
            </Col>
            <Viewer
              ref={(ref) => this.viewerr = ref}
            // onScaleChanged={(e) => this.displayScaleChanged(e)}
            >
            </Viewer>
          </Row>

        </Modal>



      </div>

    )
  }


}



export default App;
