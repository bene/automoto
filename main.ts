import { Automoto } from "./sdk";
import GoogleAdsInvoice from "./tasks/GoogleAdsInvoice";
import HandyVertragInvoice from "./tasks/HandyVertragInvoice";

const automoto = new Automoto("evobend")

automoto.register("HandyVertragInvoice", new HandyVertragInvoice())
automoto.register("GoogleAdsInvoice", new GoogleAdsInvoice())

automoto.listen(4000)