// @flow
import * as React from "react";

import type { ToastMetadata } from "./Toast";

export const ToastContext = React.createContext({
	showToast: (metadata: ToastMetadata) => {}
});
