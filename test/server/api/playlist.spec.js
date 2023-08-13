import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import { serial as test } from 'ava';
import Database from "../../../server/lib/Database";
import Playlist from "../../../server/models/user_playlist";
import routes from "../../../server/app";


process.env.NODE_ENV = 'production'; // test the production api version

let app;

test.before(async () => {
    await Database.init();
    await Playlist.remove({});
    app = express();
    app.use(bodyParser.json());
    routes(app);
});

test.after.always('clean up the database', async () => {
    Playlist.collection.drop();
});