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

test("Should create playlist", async (t) => {
    t.plan(2);
    const res = await request(app).post('/api/playlist/zayn').send({ title: "rap" });
    t.is(res.status, 200);
    const newPlaylist = res.body.playlists(playlist => playlist.title === 'rap');
    if (newPlaylist) { t.pass() };
});

test('shoud get a playlist', async t => {
    t.plan(2);
    const res = await request(app).get('/api/playlist/zayn/rap');
    t.is(res.status, 200);
    t.is(res.body.playlists.length, 1);
});

test('should add a song to a playlist', async t => {
    t.plan(2);
    const song = {
        id: '123456',
        title: 'See you again',
        artists: 'Charlie Puth - Wiz Khalifa',
    };
    const res = await request(app)
        .put('/api/playlist/zayn/rap')
        .send(song);
    t.is(res.status, 200);
    const playlist = res.body.playlists.find(playlist => playlist.title === 'rap');
    t.is(playlist.songs[0].id, song.id);
});