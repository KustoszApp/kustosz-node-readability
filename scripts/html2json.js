#!/usr/bin/env node
// SPDX-FileCopyrightText: 2022 Mirek Długosz <mirek@mirekdlugosz.com>
//
// SPDX-License-Identifier: EUPL-1.2

const fs = require('fs');

fs.readFile(process.argv[2], {encoding: 'utf-8', flag: 'r'}, (err, html) => {
    if (err) throw err;
    const data = {html: html, url: 'http://localhost/'}
    console.log(JSON.stringify(data));
});
