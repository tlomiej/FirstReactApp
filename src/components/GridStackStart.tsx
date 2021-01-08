import React, { useEffect } from "react";
import { Responsive, WidthProvider } from 'react-grid-layout';
import FormContact from "./edit/FormContact";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default class MyResponsiveGrid extends React.Component {
    render() {
        var layouts = {
            lg: [
                { i: '2', x: 6, y: 6, w: 1, h: 6, minW: 4, maxW: 7 },
                { i: 'c', x: 4, y: 0, w: 1, h: 2 }
            ], md: [
                { i: '2', x: 5, y: 6, w: 2, h: 6, minW: 4, maxW: 8 },
                { i: 'c', x: 4, y: 0, w: 1, h: 2 }
            ],
            sm: [
                { i: '2', x: 6, y: 6, w: 2, h: 6, minW: 4, maxW: 4 },
                { i: 'c', x: 4, y: 0, w: 1, h: 2 }
            ], xs: [
                { i: '2', x: 2, y: 0, w: 2, h: 6, minW: 4, maxW: 8 },
                { i: 'c', x: 4, y: 0, w: 1, h: 2 }
            ],
            xxs: [
                { i: '2', x: 2, y: 0, w: 2, h: 6, minW: 3, maxW: 4 },
                { i: '3', x: 4, y: 0, w: 1, h: 2 }
            ]
        }


        return (
            <ResponsiveGridLayout className="layout" layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}>
                <div key="2"><FormContact></FormContact></div>
            </ResponsiveGridLayout>
        )
    }
}


//
//
//
//

