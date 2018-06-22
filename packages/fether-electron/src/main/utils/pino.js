// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: BSD-3-Clause

import { app } from 'electron';
import fs from 'fs';
import { multistream } from 'pino-multi-stream';
import pino from 'pino';

// Pino by default outputs JSON. We prettify that.
const pretty = pino.pretty();
pretty.pipe(process.stdout);

// Create 2 output streams:
// - parity.log file (raw JSON)
// - stdout (prettified output)
const streams = [
  {
    level: 'info',
    stream: fs.createWriteStream(`${app.getPath('userData')}/parity.log`)
  },
  { level: 'info', stream: pretty }
];

/**
 * Create a pino instance
 *
 * @param {Object} opts - Options to pass to pino. Defaults to { name: 'electron' }.
 * @example
 * import Pino from './utils/pino';
 * const pino1 = Pino();
 * const pino2 = Pino({ name: 'parity' });
 */
export default opts =>
  pino({ name: 'electron', ...opts }, multistream(streams));
