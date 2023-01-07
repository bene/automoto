import { Automoto } from "automoto";

import GoogleAdsInvoice from "./tasks/GoogleAdsInvoice";
import HandyVertragInvoice from "./tasks/HandyVertragInvoice";
import SimpleScheduledTask from "./tasks/SimpleScheduledTask";

const automoto = new Automoto("evobend")

automoto.register("SimpleScheduledTask", new SimpleScheduledTask())
automoto.register("HandyVertragInvoice", new HandyVertragInvoice())
automoto.register("GoogleAdsInvoice", new GoogleAdsInvoice())

automoto.listen(4000)