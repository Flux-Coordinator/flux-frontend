// @flow
import * as React from "react";

import type { ToastMetadata } from "./Toast";

type ShowToast = {
	showToast: () => void
};

export const ToastContext = React.createContext({
	showToast: () => {}
});
