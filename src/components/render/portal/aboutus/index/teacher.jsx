import React,{Component} from 'react'
import Global from '../../../../../../providers/global.static.jsx'
class Teacher extends Component{
  constructor(){
    super();
    this.state={
      aboutTeacher : null

    }
   //  fetch(Global.URLBASESERVICE+"/teacher_portal/list",{
   //    method:"POST"
   //  })
   //  .then((response)=>{

   //    return response.json()
   //  })
   //  .then((rp) => {

   //    var dataT=JSON.parse(rp.dataTeacher);
   //    if (dataT != "") {
   //      this.setState({aboutTeacher:dataT});
   //    }
   //  });
  }

  render(){
    return(
      <div className="content_items">

        <div className="title">
          {/* <h2>Nuestros profesores</h2> */}
        </div>
        <div className="content_teacher">
          {
            this.state.aboutTeacher?
              this.state.aboutTeacher.map((teacher)=>{
                return
                  <div className="teacher" key={teacher.id}>
                  {/* corregir el url */}
                    <img src={this.state.aboutTeacher == null ? "": Global.pathBaseResource+"/teachers/"+teacher.id.replace(/-/g, "")+teacher.src} alt="teacher"/>
                    <div className="content_caption">
                      <h3>{teacher.name}</h3>
                      <p>{ teacher.description}</p>
                    </div>
                  </div>

              })
              :
              ''
          }

          {/* <div className="teacher">
            <img src={this.state.aboutTeacher == null ? "": Global.pathImages+this.state.aboutTeacher[0].src} alt="teacher"/>
            <p>{this.state.aboutTeacher == null ? "" : this.state.aboutTeacher[0].description}</p>
          </div>
          <div className="teacher">
            <div className="tech">
              <img src={this.state.aboutTeacher == null ? "": Global.pathImages+this.state.aboutTeacher[1].src} alt="teacher"/>
              <p>{this.state.aboutTeacher == null ? "" : this.state.aboutTeacher[1].description}</p>
            </div>
          </div>
          <div className="teacher">
            <img src={this.state.aboutTeacher == null ? "": Global.pathImages+this.state.aboutTeacher[2].src} alt="teacher"/>
            <p>{this.state.aboutTeacher == null ? "" : this.state.aboutTeacher[2].description}</p>
          </div> */}
        </div>

      </div>
    );
  }
}
export default Teacher
