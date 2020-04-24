import React, { Component } from 'react';

import New from './../../all/new.jsx';

class Notices extends Component{
    constructor(props){
        super(props);
        this.data = this.props.Notices;
        this.state = {
            dataToPopup : null
        };
        this.op = false;
        this.openModal = this.openModal.bind(this);
    }
    componentDidMount(){
        $(document).ready(function () {
            
            var render = function () {
                var width = $(".figure").width();
                
                var height = width * (407 / 533);
                $(".figure").height(height);
            };
            render();
            $(window).resize(render);
        });
    }
    clearUUID(id) {
        let response = id.replace(/-/g, "")
        return response
    }
    
    componentDidUpdate(before_props,before_status){
        if (this.op){
            $("#modal_notice").modal('open');
            this.op = false;
        }
    }

    openModal(data) {
        this.op = true;
        $("#modal_notice").modal();
        this.setState({ dataToPopup: data });
    }

    changeFormat(time) {
        time = time.slice(0, 10);
        var elements = time.split("-");
        return elements[2] + "/" + elements[1] + "/" + elements[0];
    }

    render(){
        let dataPopup = this.state.dataToPopup;
        return (
            <div>
                <div className="photos">
                    {
                        (() => {
                            if (this.data == null){
                                return null;
                            }
                            let elements = this.data.map((el) => {
                                return <New key={el.id} dataRow={el} clearUUID={this.clearUUID} openModal={this.openModal} />
                            });
                            return elements;
                        })()
                    }
                </div>
                {
                    (() => {
                        if (this.data == null) {
                            return null;
                        }
                        if (this.data.length > 0) {
                            return <div className="content_btn_more">
                                <button className="z-depth-3 btn_view_more"
                                    onClick={(e)=>{
                                        window.location.href = "/noticias";   
                                    }}
                                >
                                Ver más
                                </button>
                            </div>;
                        }
                    })()
                }
                <div id="modal_notice" className="modal">
                    <div className="content_modal_main">
                        <div className="content_modal_img" id="content_modal_img">
                            {
                                (() => {
                                    if (dataPopup != null) {
                                        return <img src={dataPopup ? dataPopup.path_img : ""}
                                            id={"modal_img"}
                                            ref={(img) => {
                                                if (!img) { return; }
                                                img.onload = () => {
                                                    let idTag = $("#modal_img");
                                                    let idFather = $("#content_modal_img");
                                                    idTag.removeAttr("style");
                                                    idTag.removeClass("max_width");
                                                    idTag.removeClass("max_height");
                                                    idFather.removeClass("with_flex");
                                                    let height = img.height;
                                                    let width = img.width;
                                                    if (height > width) {
                                                        idTag.addClass("max_height");
                                                        idFather.addClass("with_flex");
                                                    } else if (height < width) {
                                                        idTag.addClass("max_width");
                                                    } else {
                                                        idTag.addClass("max_width");
                                                    }
                                                };
                                            }}
                                            alt={dataPopup.title} />;
                                    }
                                })()
                            }
                        </div>
                        <div className="modal_content_txt">
                            <h4 className="modal_title">{dataPopup ? dataPopup.title : ""}</h4>
                            <div className="modal_time">
                                <span>{dataPopup ? this.changeFormat(dataPopup.created_at) : ""}</span>
                            </div>
                            <p>{dataPopup ? dataPopup.subtitle : ""}</p>
                            <p>{dataPopup ? dataPopup.description : ""}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Notices;