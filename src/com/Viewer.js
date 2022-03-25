import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { EventBus, PDFViewer } from 'pdfjs-dist/web/pdf_viewer';
import './Viewer.css';
import 'pdfjs-dist/web/pdf_viewer.css';

class Viewer extends Component {
  constructor(props) {
    super(props);
    //渲染完成以后会运行这个函数，这个函数用来取到pdf所有信息
    this.initEventBus();
    this.state = {
      doc: null,
      scale: undefined,
    };
  }
  initEventBus() {

    let eventBus = new EventBus();
    console.log(eventBus);
    eventBus.on('pagesinit', (e) => {
      console.log(e)
      this.setState({
        scale: this._pdfViewer.currentScale
      });
      // if (this.props.onInit) {
      //   this.props.onInit({});
      // }
      // if (this.props.onScaleChanged) {
      //   this.props.onScaleChanged({ scale: this.state.scale });
      // }
    });
    // eventBus.on('scalechange', (e) => {
    //   if (this.props.onScaleChanged) {
    //     this.props.onScaleChanged({ scale: e.scale });
    //   }
    // });
    this._eventBus = eventBus;
  }
  componentDidMount() {

    // let viewerContainer = ReactDOM.findDOMNode(this);
    let viewerContainer = this.reff

    this._pdfViewer = new PDFViewer({
      container: viewerContainer,
      eventBus: this._eventBus,
      // getPageView:
    });
  }
  componentWillUpdate(nextProps, nextState) {

    if (this.state.doc !== nextState.doc) {
      console.log("这里的viewerContainer", )
      this._pdfViewer.setDocument(nextState.doc);
    }
    if (this.state.scale !== nextState.scale) {
      console.log("这里的viewerContainer", )
      this._pdfViewer.currentScale = nextState.scale;
      // this._pdfViewer.pagesRotation = 2;
      
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("nextProps, nextState", nextProps, nextState)
    if (this.state.doc !== nextState.doc ||
      this.state.scale !== nextState.scale) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <div
        ref={e => this.reff = e}
        className="Viewer">
        <div className="pdfViewer"></div>
      </div>
    );
  }
}

Viewer.propTypes = {
  onInit: PropTypes.func,
  onScaleChanged: PropTypes.func,
};

export default Viewer;