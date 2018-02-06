import * as Base from 'atma-io-middleware-base'
import { process } from './hint'
import { Action } from './action'

export = Base.create({
    name: 'atma-io-middleware-hint',
    defaultOptions: {},
    textOnly: true,
    process,
    action: Action
});