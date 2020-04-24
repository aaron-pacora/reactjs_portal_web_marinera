import React, { Component } from 'react';

import IconMenu from '../../../icons/svg_menu.svg';
import global from '../../../../providers/global.static.jsx';

class Header extends Component {
    constructor(props) {
        super(props);
        this.val_selector = this.props.selected;
        configHeader();
    }
    render() {
        return (
            <div className="contenedor">
                <div className="header z-depth-4">
                    <div className="menu">
                        <div className="button_logo">
                            <button className="button">
                                <IconMenu />
                            </button>
                            <div className="tiped_logo">
                                <a href="/">
                                    <img src={global.URBBASERESOURCE+"/sources/png_values.png"} alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="content_elements">
                            <div className="element">
                                <a className={isSelected(this.val_selector,"home")} href="/">Inicio</a>
                            </div>
                            <div className="element">
                                <a className={isSelected(this.val_selector,"about_us")} href="/sobre_nosotros">Sobre Nosotros</a>
                            </div>
                            <div className="element">
                                <a className={isSelected(this.val_selector, "news")} href="/noticias">Noticias</a>
                            </div>
                            <div className="element">
                                <a className={isSelected(this.val_selector, "contests")} href="/concursos">Concursos</a>
                            </div>
                            <div className="element">
                                <a className={isSelected(this.val_selector,"contact")} href="/contacto">Contacto</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function configHeader() {
    $(document).ready(function () {
        var button = $(".button");
        var menu = $(".content_elements");
        button.on("click", function () {
            if (menu.is(".clicked")) {
                menu.removeClass("clicked")
            } else {
                menu.addClass("clicked")
            }
        })
        // var option = $(".element").find("a");
        // var module = $(".module");
        // var name = module.removeClass("module").attr('class');
        // var b = $(".element").find("." + name);
        // option.removeClass("selected");
        // b.addClass("selected");
    })
}

function isSelected(nameToValidate, valitator) {
    return nameToValidate == valitator ? 'selected' : '';
}

export default Header
