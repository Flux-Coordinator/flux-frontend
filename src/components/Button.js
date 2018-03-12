// @flow

import * as React from "react";

type Props = {
    children?: React.Node
};

export default function Button(props : Props) {
    return (
        <button>{props.children}</button>
    );
}