import React from "react";
import Routes from "../routes/Index";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope, faKey);
export default props => <>{Routes}</>;