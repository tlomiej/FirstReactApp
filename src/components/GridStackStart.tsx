import React, { useEffect } from "react";
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import FormContact from "./edit/FormContact";

const ResponsiveGridLayout = WidthProvider(Responsive);

type Props = {
    layouts: Layouts;
    showEditForm: Boolean;
    showViewForm: Boolean;


};

export default class MyResponsiveGrid extends React.Component<Props> {

    editForm() {
         if (this.props.showEditForm) {
            return (<div key="2"><FormContact></FormContact></div>)
        }else{
            return (<div key="2"></div>)
        }
       

    }
    viewForm() {
        if (this.props.showViewForm) {
            return (<div key="3">Przegladanie<FormContact></FormContact></div>)
        }else{
            return (<div key="3"></div>)
        }
    }


    render() {
        return (
            <ResponsiveGridLayout  className="layout" layouts={this.props.layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}>
                {this.editForm()}
                {this.viewForm()}
                {/*     <div key="2X"></div>
                {this.props.showEditForm ? (<div key="2"><FormContact></FormContact></div>): null}   
                  */}
            </ResponsiveGridLayout>
        )
    }
}


//
//
//
//

