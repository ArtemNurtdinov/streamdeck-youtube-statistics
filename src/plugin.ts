import streamDeck from "@elgato/streamdeck";
import { ViewsAction } from "./actions/views-action.js";
import { LikesAction } from "./actions/likes-action.js";
import { CommentsAction } from "./actions/comments-action.js";
import { SubscribersAction } from "./actions/subscribers-action.js";
import { ChannelViewsAction } from "./actions/channel-views-action.js";
import { ChannelVideosAction } from "./actions/channel-videos-action.js";
import { StreamOnlineAction } from "./actions/stream-online-action.js";

streamDeck.actions.registerAction(new ViewsAction());
streamDeck.actions.registerAction(new LikesAction());
streamDeck.actions.registerAction(new CommentsAction());
streamDeck.actions.registerAction(new SubscribersAction());
streamDeck.actions.registerAction(new ChannelViewsAction());
streamDeck.actions.registerAction(new ChannelVideosAction());
streamDeck.actions.registerAction(new StreamOnlineAction());

streamDeck.connect();
