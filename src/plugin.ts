import streamDeck from "@elgato/streamdeck";
import { ViewsAction } from "./actions/views-action.js";
import { LikesAction } from "./actions/likes-action.js";
import { CommentsAction } from "./actions/comments-action.js";
import { LastVideoCommentsAction } from "./actions/last-video-comments-action.js";
import { LastVideoLikesAction } from "./actions/last-video-likes-action.js";
import { LastVideoViewsAction } from "./actions/last-video-views-action.js";
import { SubscribersAction } from "./actions/subscribers-action.js";
import { ChannelViewsAction } from "./actions/channel-views-action.js";
import { ChannelVideosAction } from "./actions/channel-videos-action.js";
import { StreamOnlineAction } from "./actions/stream-online-action.js";

streamDeck.actions.registerAction(new ViewsAction());
streamDeck.actions.registerAction(new LikesAction());
streamDeck.actions.registerAction(new CommentsAction());
streamDeck.actions.registerAction(new LastVideoViewsAction());
streamDeck.actions.registerAction(new LastVideoLikesAction());
streamDeck.actions.registerAction(new LastVideoCommentsAction());
streamDeck.actions.registerAction(new SubscribersAction());
streamDeck.actions.registerAction(new ChannelViewsAction());
streamDeck.actions.registerAction(new ChannelVideosAction());
streamDeck.actions.registerAction(new StreamOnlineAction());

streamDeck.connect();
