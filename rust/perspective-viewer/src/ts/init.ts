/******************************************************************************
 *
 * Copyright (c) 2018, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms
 * of the Apache License 2.0.  The full license can be found in the LICENSE
 * file.
 *
 */

import {decompressSync} from "fflate";

import init_wasm from "@finos/perspective-viewer/dist/pkg/perspective_viewer.js";
import wasm from "@finos/perspective-viewer/dist/pkg/perspective_viewer_bg.wasm";

// There is no way to provide a default rejection handler within a promise and
// also not lock the await-er, so this module attaches a global handler to
// filter out cancelled query messages.
window.addEventListener("unhandledrejection", (event) => {
    if (event.reason?.message === "View method cancelled") {
        event.preventDefault();
    }
});

async function load_wasm() {
    const compressed = (await wasm) as unknown as ArrayBuffer;
    // Unzip if needed
    if (new Uint32Array(compressed.slice(0, 4))[0] == 559903) {
        return await init_wasm(decompressSync(new Uint8Array(compressed)));
    } else {
        return await init_wasm(compressed);
    }
}

export const WASM_MODULE = load_wasm();
