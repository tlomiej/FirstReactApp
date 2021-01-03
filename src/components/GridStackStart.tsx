import React, { useEffect } from "react";
import { Responsive, WidthProvider } from 'react-grid-layout';
import FormContact from "./edit/FormContact";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default class MyResponsiveGrid extends React.Component {
    render() {
        var layouts = {
            lg: [
                { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
                { i: 'b', x: 4, y: 6, w: 4, h: 6, minW: 3, maxW: 7 },
                { i: 'c', x: 4, y: 0, w: 1, h: 2 }
            ], md: [
                { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
                { i: 'b', x: 2, y: 5, w: 4, h: 6, minW: 3, maxW: 4 },
                { i: 'c', x: 4, y: 0, w: 1, h: 2 }
            ],
            sm: [
                { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
                { i: 'b', x: 2, y: 5, w: 4, h: 6, minW: 3, maxW: 4 },
                { i: 'c', x: 4, y: 0, w: 1, h: 2 }
            ], xs: [
                { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
                { i: 'b', x: 2, y: 0, w: 2, h: 6, minW: 3, maxW: 4 },
                { i: 'c', x: 4, y: 0, w: 1, h: 2 }
            ],
            xxs: [
                { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
                { i: 'b', x: 2, y: 0, w: 2, h: 6, minW: 3, maxW: 4 },
                { i: 'c', x: 4, y: 0, w: 1, h: 2 }
            ]
        }


        return (
            <ResponsiveGridLayout className="layout" layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>
                <div key="1">1</div>
                <div key="2"><FormContact></FormContact></div>
                <div key="3">3</div>
            </ResponsiveGridLayout>
        )
    }
}


//
//
//
//

