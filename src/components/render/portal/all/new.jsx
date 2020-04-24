import React,{Component} from 'react';
import global from './../../../../../providers/global.static.jsx';
class New extends Component{
    constructor(props){
        super(props);
        let data = this.props.dataRow;
        this.dataNotice = data;
        this.clearUUID  = this.props.clearUUID;
        this.openModal = this.props.openModal;
    }
    onChangeImage(pathImg) {
        let img = new Image();
        let currentThis = this;
        img.onload = function () {
            var height = img.height;
            var width = img.width;
            if (height > width) {
                $("img").addClass("max_height");
                $("img").removeClass("max_width");
            } else {
                $("img").removeClass("max_height");
                $("img").addClass("max_width");
            }
        };
        img.src = pathImg;
    }
    render(){
        let clearuuid = this.clearUUID(this.dataNotice.id);
        this.dataNotice.path_img = global.URBBASERESOURCE + "/notices/" + clearuuid + this.dataNotice.src;
        return (
            <div className="figure inload" id={clearuuid}>
                <img src={this.dataNotice.path_img} id={clearuuid+"_img"}
                    ref={(img)=>{
                        if (!img) { return; }
                        img.onload = () => {
                            let idTag = "#" + clearuuid;
                            let height = img.height;
                            let width = img.width;
                            if (height > width) {
                                $(idTag).addClass("max_height");
                                $(idTag).removeClass("max_width");
                            } else {
                                $(idTag).removeClass("max_height");
                                $(idTag).addClass("max_width");
                            }
                            if (img.complete) {
                                $(idTag).removeClass("inload");
                                Materialize.fadeInImage(idTag+"_img");
                            }
                        };
                    }}
                    alt="error"/>
                <div className="content_preloader">
                    <div className="preloader-wrapper active">
                        <div className="spinner-layer">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="figcaption waves-effect waves-beach"
                    onClick={() => {
                            this.openModal(this.dataNotice);
                        }}>
                    <h2>{this.dataNotice.title}</h2>
                    <span>{this.dataNotice.subtitle}</span>
                </a>
            </div>
        );
    }
}
export default New;
