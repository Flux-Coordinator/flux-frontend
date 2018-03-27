import * as React from "react";
import Image from "grommet/components/Image";

import placeholder from "../../images/placeholder.png";

type Props = {
	src?: string,
	alt?: string
};

export default function FloorPlan({ src, alt }: Props) {
	return <Image src={src} alt="Floor Plan" size="large" />;
}

FloorPlan.defaultProps = {
	src: placeholder,
	alt: "Floor Plan"
};
