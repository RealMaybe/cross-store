/* main entry point for the library */

import { Store } from "@/storage/Store";
import { Communicate } from "@/communicate/Communicate";
import * as typeUtils from "@/typeUtils";

/* ========== */

// Create a public function object
const checker = { ...typeUtils } as const;

// export the classes and functions
export { Store, Communicate, checker };
