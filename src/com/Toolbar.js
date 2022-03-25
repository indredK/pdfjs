import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Toolbar.css';
import { Input, Row, Col, Select } from 'antd';
const { Option } = Select;
class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 100,
            numPages: 0,
            currentPage: 1
        };
    }
    zoomIn(e) {
        if (this.props.onZoomIn) { this.props.onZoomIn(e); }
    }
    zoomOut(e) {
        if (this.props.onZoomOut) { this.props.onZoomOut(e); }
    }
    zoom(e) {
        if (this.props.onZoom) { this.props.onZoom(e); }
    }




    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.scale !== nextState.scale) {
            return true;
        }
        if (this.state.numPages !== nextState.numPages) {
            return true;
        }
        return false;
    }

    renderSelect(number) {
        let res = 0
        let nums = [25, 50, 75, 100, 125, 150]
        nums.forEach((item) => {
            if (number < 20) {
                res = (number * 100).toFixed(1) + "%"
            } else {
                res = number
            }
        })
        return res
    }


    render() {
        return (<div className="Toolbar">
            <Row>
                <Col span={1}>
                    {/* 翻页 */}
                    <button className="ZoomIn" onClick={(e) => this.zoomOut(e)}> {"<"}    </button>
                </Col>

                <Col span={1}>

                    <Input     ></Input>
                </Col>
                <Col span={1}>
                    /
                </Col>
                <Col span={1}>
                    {this.state.numPages}
                </Col>
                <Col span={1}>
                    {/* 翻页 */}
                    <button className="ZoomOut" onClick={(e) => this.zoomIn(e)}>  {">"} </button>
                </Col>

                <Col span={2}>
                    {/* 缩小 */}
                    <button className="ZoomIn" onClick={(e) => this.zoomOut(e)}> {"缩小"}    </button>
                </Col>
                <Col span={2}>
                    {/* 放大 */}
                    <button className="ZoomOut" onClick={(e) => this.zoomIn(e)}>  {"放大"} </button>
                </Col>

                <Col span={5}>
                    <Select
                        style={{ width: 100 }}
                        value={this.renderSelect(this.state.scale)}
                        onChange={(e) => {
                            console.log(e)
                            this.setState({ scale: e })
                            this.zoom(e / 100)
                        }}
                    >

                        <Option value={150}>150%</Option>
                        <Option value={125}>125%</Option>
                        <Option value={100}>100%</Option>
                        <Option value={75}>75%</Option>
                        <Option value={50}>50%</Option>
                        <Option value={25}>25%</Option>
                    </Select>
                    {/* <button className="ZoomPercent">{(this.state.scale * 100).toFixed(1)}%</button> */}
                </Col>

            </Row>
            <span>



            </span>


        </div>);
    }
}

Toolbar.propTypes = {
    // onZoomIn: PropTypes.func,
    // onZoomOut: PropTypes.func,
}

export default Toolbar;