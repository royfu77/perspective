/******************************************************************************
 *
 * Copyright (c) 2018, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms
 * of the Apache License 2.0.  The full license can be found in the LICENSE
 * file.
 *
 */

import "./dragdrop.js";

const MODULE = import(
    /* webpackChunkName: "perspective-viewer.custom-element" */
    /* webpackMode: "eager" */
    "./viewer.js"
);

export async function _get_module() {
    return await MODULE;
}
