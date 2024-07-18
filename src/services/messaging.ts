import { AppwriteException, Client, type Payload, UploadProgress } from '../client';
import type { Models } from '../models';
import { SmtpEncryption } from '../enums/smtp-encryption';

export class Messaging {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * List messages
     *
     * Get a list of all messages from the current Appwrite project.
     *
     * @param {Object} params
     * @param {string[]} params.queries
     * @param {string} params.search
     * @throws {AppwriteException}
     * @returns {Promise<Models.MessageList>}
     */
    async listMessages(params?: { queries?: string[], search?: string }): Promise<Models.MessageList> {
        const { queries, search } = params || {};

        const apiPath = '/messaging/messages';
        const payload: Payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        if (typeof search !== 'undefined') {
            payload['search'] = search;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create email
     *
     * Create a new email message.
     *
     * @param {string} messageId
     * @param {string} subject
     * @param {string} content
     * @param {Object} params
     * @param {string[]} params.topics
     * @param {string[]} params.users
     * @param {string[]} params.targets
     * @param {string[]} params.cc
     * @param {string[]} params.bcc
     * @param {string[]} params.attachments
     * @param {boolean} params.draft
     * @param {boolean} params.html
     * @param {string} params.scheduledAt
     * @throws {AppwriteException}
     * @returns {Promise<Models.Message>}
     */
    async createEmail(
        messageId: string, subject: string, content: string,
        params?: {
            topics?: string[],
            users?: string[],
            targets?: string[],
            cc?: string[],
            bcc?: string[],
            attachments?: string[],
            draft?: boolean,
            html?: boolean,
            scheduledAt?: string
        }
    ): Promise<Models.Message> {
        const {topics, users, targets, cc, bcc, attachments, draft, html, scheduledAt} = params || {};

        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }
        if (typeof subject === 'undefined') {
            throw new AppwriteException('Missing required parameter: "subject"');
        }
        if (typeof content === 'undefined') {
            throw new AppwriteException('Missing required parameter: "content"');
        }
        const apiPath = '/messaging/messages/email';
        const payload: Payload = {};
        if (typeof messageId !== 'undefined') {
            payload['messageId'] = messageId;
        }
        if (typeof subject !== 'undefined') {
            payload['subject'] = subject;
        }
        if (typeof content !== 'undefined') {
            payload['content'] = content;
        }
        if (typeof topics !== 'undefined') {
            payload['topics'] = topics;
        }
        if (typeof users !== 'undefined') {
            payload['users'] = users;
        }
        if (typeof targets !== 'undefined') {
            payload['targets'] = targets;
        }
        if (typeof cc !== 'undefined') {
            payload['cc'] = cc;
        }
        if (typeof bcc !== 'undefined') {
            payload['bcc'] = bcc;
        }
        if (typeof attachments !== 'undefined') {
            payload['attachments'] = attachments;
        }
        if (typeof draft !== 'undefined') {
            payload['draft'] = draft;
        }
        if (typeof html !== 'undefined') {
            payload['html'] = html;
        }
        if (typeof scheduledAt !== 'undefined') {
            payload['scheduledAt'] = scheduledAt;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Update email
     *
     * Update an email message by its unique ID.

     *
     * @param {string} messageId
     * @param {Object} params
     * @param {string[]} params.topics
     * @param {string[]} params.users
     * @param {string[]} params.targets
     * @param {string} params.subject
     * @param {string} params.content
     * @param {boolean} params.draft
     * @param {boolean} params.html
     * @param {string[]} params.cc
     * @param {string[]} params.bcc
     * @param {string} params.scheduledAt
     * @param {string[]} params.attachments
     * @throws {AppwriteException}
     * @returns {Promise<Models.Message>}
     */
    async updateEmail(
        messageId: string,
        params?: { topics?: string[], users?: string[], targets?: string[], subject?: string, content?: string, draft?: boolean, html?: boolean, cc?: string[], bcc?: string[], scheduledAt?: string, attachments?: string[] }
    ): Promise<Models.Message> {
        const {topics, users, targets, subject, content, draft, html, cc, bcc, scheduledAt, attachments} = params || {};

        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }
        const apiPath = '/messaging/messages/email/{messageId}'.replace('{messageId}', messageId);
        const payload: Payload = {};
        if (typeof topics !== 'undefined') {
            payload['topics'] = topics;
        }
        if (typeof users !== 'undefined') {
            payload['users'] = users;
        }
        if (typeof targets !== 'undefined') {
            payload['targets'] = targets;
        }
        if (typeof subject !== 'undefined') {
            payload['subject'] = subject;
        }
        if (typeof content !== 'undefined') {
            payload['content'] = content;
        }
        if (typeof draft !== 'undefined') {
            payload['draft'] = draft;
        }
        if (typeof html !== 'undefined') {
            payload['html'] = html;
        }
        if (typeof cc !== 'undefined') {
            payload['cc'] = cc;
        }
        if (typeof bcc !== 'undefined') {
            payload['bcc'] = bcc;
        }
        if (typeof scheduledAt !== 'undefined') {
            payload['scheduledAt'] = scheduledAt;
        }
        if (typeof attachments !== 'undefined') {
            payload['attachments'] = attachments;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create push notification
     *
     * Create a new push notification.
     *
     * @param {string} messageId
     * @param {string} title
     * @param {string} body
     * @param {Object} params
     * @param {string[]} params.topics
     * @param {string[]} params.users
     * @param {string[]} params.targets
     * @param {object} params.data
     * @param {string} params.action
     * @param {string} params.image
     * @param {string} params.icon
     * @param {string} params.sound
     * @param {string} params.color
     * @param {string} params.tag
     * @param {string} params.badge
     * @param {boolean} params.draft
     * @param {string} params.scheduledAt
     * @throws {AppwriteException}
     * @returns {Promise<Models.Message>}
     */
    async createPush(
        messageId: string, title: string, body: string,
        params?: {
            topics?: string[];
            users?: string[];
            targets?: string[];
            data?: object;
            action?: string;
            image?: string;
            icon?: string;
            sound?: string;
            color?: string;
            tag?: string;
            badge?: string;
            draft?: boolean;
            scheduledAt?: string;
        }
    ): Promise<Models.Message> {
        const {topics, users, targets, data, action, image, icon, sound, color, tag, badge, draft, scheduledAt} = params || {};

        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }
        if (typeof title === 'undefined') {
            throw new AppwriteException('Missing required parameter: "title"');
        }
        if (typeof body === 'undefined') {
            throw new AppwriteException('Missing required parameter: "body"');
        }
        const apiPath = '/messaging/messages/push';
        const payload: Payload = {};
        if (typeof messageId !== 'undefined') {
            payload['messageId'] = messageId;
        }
        if (typeof title !== 'undefined') {
            payload['title'] = title;
        }
        if (typeof body !== 'undefined') {
            payload['body'] = body;
        }
        if (typeof topics !== 'undefined') {
            payload['topics'] = topics;
        }
        if (typeof users !== 'undefined') {
            payload['users'] = users;
        }
        if (typeof targets !== 'undefined') {
            payload['targets'] = targets;
        }
        if (typeof data !== 'undefined') {
            payload['data'] = data;
        }
        if (typeof action !== 'undefined') {
            payload['action'] = action;
        }
        if (typeof image !== 'undefined') {
            payload['image'] = image;
        }
        if (typeof icon !== 'undefined') {
            payload['icon'] = icon;
        }
        if (typeof sound !== 'undefined') {
            payload['sound'] = sound;
        }
        if (typeof color !== 'undefined') {
            payload['color'] = color;
        }
        if (typeof tag !== 'undefined') {
            payload['tag'] = tag;
        }
        if (typeof badge !== 'undefined') {
            payload['badge'] = badge;
        }
        if (typeof draft !== 'undefined') {
            payload['draft'] = draft;
        }
        if (typeof scheduledAt !== 'undefined') {
            payload['scheduledAt'] = scheduledAt;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Update push notification
     *
     * Update a push notification by its unique ID.

     *
     * @param {string} messageId
     * @param {Object} params
     * @param {string[]} params.topics
     * @param {string[]} params.users
     * @param {string[]} params.targets
     * @param {string} params.title
     * @param {string} params.body
     * @param {object} params.data
     * @param {string} params.action
     * @param {string} params.image
     * @param {string} params.icon
     * @param {string} params.sound
     * @param {string} params.color
     * @param {string} params.tag
     * @param {number} params.badge
     * @param {boolean} params.draft
     * @param {string} params.scheduledAt
     * @throws {AppwriteException}
     * @returns {Promise<Models.Message>}
     */
    async updatePush(
        messageId: string,
        params?: {
            topics?: string[];
            users?: string[];
            targets?: string[];
            title?: string;
            body?: string;
            data?: object;
            action?: string;
            image?: string;
            icon?: string;
            sound?: string;
            color?: string;
            tag?: string;
            badge?: number;
            draft?: boolean;
            scheduledAt?: string;
        }
    ): Promise<Models.Message> {
        const { topics, users, targets, title, body, data, action, image, icon, sound, color, tag, badge, draft, scheduledAt } = params || {};

        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }
        const apiPath = '/messaging/messages/push/{messageId}'.replace('{messageId}', messageId);
        const payload: Payload = {};
        if (typeof topics !== 'undefined') {
            payload['topics'] = topics;
        }
        if (typeof users !== 'undefined') {
            payload['users'] = users;
        }
        if (typeof targets !== 'undefined') {
            payload['targets'] = targets;
        }
        if (typeof title !== 'undefined') {
            payload['title'] = title;
        }
        if (typeof body !== 'undefined') {
            payload['body'] = body;
        }
        if (typeof data !== 'undefined') {
            payload['data'] = data;
        }
        if (typeof action !== 'undefined') {
            payload['action'] = action;
        }
        if (typeof image !== 'undefined') {
            payload['image'] = image;
        }
        if (typeof icon !== 'undefined') {
            payload['icon'] = icon;
        }
        if (typeof sound !== 'undefined') {
            payload['sound'] = sound;
        }
        if (typeof color !== 'undefined') {
            payload['color'] = color;
        }
        if (typeof tag !== 'undefined') {
            payload['tag'] = tag;
        }
        if (typeof badge !== 'undefined') {
            payload['badge'] = badge;
        }
        if (typeof draft !== 'undefined') {
            payload['draft'] = draft;
        }
        if (typeof scheduledAt !== 'undefined') {
            payload['scheduledAt'] = scheduledAt;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create SMS
     *
     * Create a new SMS message.
     *
     * @param {string} messageId
     * @param {string} content
     * @param {Object} params
     * @param {string[]} params.topics
     * @param {string[]} params.users
     * @param {string[]} params.targets
     * @param {boolean} params.draft
     * @param {string} params.scheduledAt
     * @throws {AppwriteException}
     * @returns {Promise<Models.Message>}
     */
    async createSms(
        messageId: string, content: string,
        params?: {
            topics?: string[];
            users?: string[];
            targets?: string[];
            draft?: boolean;
            scheduledAt?: string;
        }
    ): Promise<Models.Message> {
        const { topics, users, targets, draft, scheduledAt } = params || {};

        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }
        if (typeof content === 'undefined') {
            throw new AppwriteException('Missing required parameter: "content"');
        }
        const apiPath = '/messaging/messages/sms';
        const payload: Payload = {};
        if (typeof messageId !== 'undefined') {
            payload['messageId'] = messageId;
        }
        if (typeof content !== 'undefined') {
            payload['content'] = content;
        }
        if (typeof topics !== 'undefined') {
            payload['topics'] = topics;
        }
        if (typeof users !== 'undefined') {
            payload['users'] = users;
        }
        if (typeof targets !== 'undefined') {
            payload['targets'] = targets;
        }
        if (typeof draft !== 'undefined') {
            payload['draft'] = draft;
        }
        if (typeof scheduledAt !== 'undefined') {
            payload['scheduledAt'] = scheduledAt;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Update SMS
     *
     * Update an email message by its unique ID.

     *
     * @param {string} messageId
     * @param {Object} params
     * @param {string[]} params.topics
     * @param {string[]} params.users
     * @param {string[]} params.targets
     * @param {string} params.content
     * @param {boolean} params.draft
     * @param {string} params.scheduledAt
     * @throws {AppwriteException}
     * @returns {Promise<Models.Message>}
     */
    async updateSms(
        messageId: string,
        params?: {
            topics?: string[];
            users?: string[];
            targets?: string[];
            content?: string;
            draft?: boolean;
            scheduledAt?: string;
        }
    ): Promise<Models.Message> {
        const { topics, users, targets, content, draft, scheduledAt } = params || {};

        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }
        const apiPath = '/messaging/messages/sms/{messageId}'.replace('{messageId}', messageId);
        const payload: Payload = {};
        if (typeof topics !== 'undefined') {
            payload['topics'] = topics;
        }
        if (typeof users !== 'undefined') {
            payload['users'] = users;
        }
        if (typeof targets !== 'undefined') {
            payload['targets'] = targets;
        }
        if (typeof content !== 'undefined') {
            payload['content'] = content;
        }
        if (typeof draft !== 'undefined') {
            payload['draft'] = draft;
        }
        if (typeof scheduledAt !== 'undefined') {
            payload['scheduledAt'] = scheduledAt;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Get message
     *
     * Get a message by its unique ID.

     *
     * @param {string} messageId
     * @throws {AppwriteException}
     * @returns {Promise<Models.Message>}
     */
    async getMessage(messageId: string): Promise<Models.Message> {
        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }
        const apiPath = '/messaging/messages/{messageId}'.replace('{messageId}', messageId);
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Delete message
     *
     * Delete a message. If the message is not a draft or scheduled, but has been sent, this will not recall the message.
     *
     * @param {string} messageId
     * @throws {AppwriteException}
     * @returns {Promise<{}>}
     */
    async delete(messageId: string): Promise<{}> {
        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }
        const apiPath = '/messaging/messages/{messageId}'.replace('{messageId}', messageId);
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'delete',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * List message logs
     *
     * Get the message activity logs listed by its unique ID.
     *
     * @param {string} messageId
     * @param {string[]} queries
     * @throws {AppwriteException}
     * @returns {Promise<Models.LogList>}
     */
    async listMessageLogs(messageId: string, queries?: string[]): Promise<Models.LogList> {
        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }
        const apiPath = '/messaging/messages/{messageId}/logs'.replace('{messageId}', messageId);
        const payload: Payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * List message targets
     *
     * Get a list of the targets associated with a message.
     *
     * @param {string} messageId
     * @param {string[]} queries
     * @throws {AppwriteException}
     * @returns {Promise<Models.TargetList>}
     */
    async listTargets(messageId: string, queries?: string[]): Promise<Models.TargetList> {
        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }
        const apiPath = '/messaging/messages/{messageId}/targets'.replace('{messageId}', messageId);
        const payload: Payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * List providers
     *
     * Get a list of all providers from the current Appwrite project.
     *
     * @param {string[]} queries
     * @param {string} search
     * @throws {AppwriteException}
     * @returns {Promise<Models.ProviderList>}
     */
    async listProviders(queries?: string[], search?: string): Promise<Models.ProviderList> {
        const apiPath = '/messaging/providers';
        const payload: Payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        if (typeof search !== 'undefined') {
            payload['search'] = search;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create APNS provider
     *
     * Create a new Apple Push Notification service provider.
     *
     * @param {string} providerId
     * @param {string} name
     * @param {string} authKey
     * @param {string} authKeyId
     * @param {string} teamId
     * @param {string} bundleId
     * @param {boolean} sandbox
     * @param {boolean} enabled
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async createApnsProvider(
        providerId: string, name: string,
        params?: {
            authKey?: string;
            authKeyId?: string;
            teamId?: string;
            bundleId?: string;
            sandbox?: boolean;
            enabled?: boolean;
        }
    ): Promise<Models.Provider> {
        const { authKey, authKeyId, teamId, bundleId, sandbox, enabled } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }
        const apiPath = '/messaging/providers/apns';
        const payload: Payload = {};
        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof authKey !== 'undefined') {
            payload['authKey'] = authKey;
        }
        if (typeof authKeyId !== 'undefined') {
            payload['authKeyId'] = authKeyId;
        }
        if (typeof teamId !== 'undefined') {
            payload['teamId'] = teamId;
        }
        if (typeof bundleId !== 'undefined') {
            payload['bundleId'] = bundleId;
        }
        if (typeof sandbox !== 'undefined') {
            payload['sandbox'] = sandbox;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Update APNS provider
     *
     * Update an Apple Push Notification service provider by its unique ID.
     *
     * @param {string} providerId
     * @param {Object} params
     * @param {string} params.name
     * @param {boolean} params.enabled
     * @param {string} params.authKey
     * @param {string} params.authKeyId
     * @param {string} params.teamId
     * @param {string} params.bundleId
     * @param {boolean} params.sandbox
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async updateApnsProvider(
        providerId: string,
        params?: {
            name?: string;
            enabled?: boolean;
            authKey?: string;
            authKeyId?: string;
            teamId?: string;
            bundleId?: string;
            sandbox?: boolean;
        }
    ): Promise<Models.Provider> {
        const { name, enabled, authKey, authKeyId, teamId, bundleId, sandbox } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        const apiPath = '/messaging/providers/apns/{providerId}'.replace('{providerId}', providerId);
        const payload: Payload = {};
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        if (typeof authKey !== 'undefined') {
            payload['authKey'] = authKey;
        }
        if (typeof authKeyId !== 'undefined') {
            payload['authKeyId'] = authKeyId;
        }
        if (typeof teamId !== 'undefined') {
            payload['teamId'] = teamId;
        }
        if (typeof bundleId !== 'undefined') {
            payload['bundleId'] = bundleId;
        }
        if (typeof sandbox !== 'undefined') {
            payload['sandbox'] = sandbox;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create FCM provider
     *
     * Create a new Firebase Cloud Messaging provider.
     *
     * @param {string} providerId
     * @param {string} name
     * @param {Object} params
     * @param {object} params.serviceAccountJSON
     * @param {boolean} params.enabled
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async createFcmProvider(
        providerId: string, name: string,
        params?: {
            serviceAccountJSON?: object;
            enabled?: boolean;
        }
    ): Promise<Models.Provider> {
        const { serviceAccountJSON, enabled } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }
        const apiPath = '/messaging/providers/fcm';
        const payload: Payload = {};
        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof serviceAccountJSON !== 'undefined') {
            payload['serviceAccountJSON'] = serviceAccountJSON;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Update FCM provider
     *
     * Update a Firebase Cloud Messaging provider by its unique ID.
     *
     * @param {string} providerId
     * @param {Object} params
     * @param {string} params.name
     * @param {boolean} params.enabled
     * @param {object} params.serviceAccountJSON
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async updateFcmProvider(
        providerId: string,
        params?: {
            name?: string;
            enabled?: boolean;
            serviceAccountJSON?: object;
        }
    ): Promise<Models.Provider> {
        const { name, enabled, serviceAccountJSON } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        const apiPath = '/messaging/providers/fcm/{providerId}'.replace('{providerId}', providerId);
        const payload: Payload = {};
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        if (typeof serviceAccountJSON !== 'undefined') {
            payload['serviceAccountJSON'] = serviceAccountJSON;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create Mailgun provider
     *
     * Create a new Mailgun provider.
     *
     * @param {string} providerId
     * @param {string} name
     * @param {Object} params
     * @param {string} params.apiKey
     * @param {string} params.domain
     * @param {boolean} params.isEuRegion
     * @param {string} params.fromName
     * @param {string} params.fromEmail
     * @param {string} params.replyToName
     * @param {string} params.replyToEmail
     * @param {boolean} params.enabled
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async createMailgunProvider(
        providerId: string, name: string,
        params?: {
            apiKey?: string;
            domain?: string;
            isEuRegion?: boolean;
            fromName?: string;
            fromEmail?: string;
            replyToName?: string;
            replyToEmail?: string;
            enabled?: boolean;
        }
    ): Promise<Models.Provider> {
        const { apiKey, domain, isEuRegion, fromName, fromEmail, replyToName, replyToEmail, enabled } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }
        const apiPath = '/messaging/providers/mailgun';
        const payload: Payload = {};
        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }
        if (typeof domain !== 'undefined') {
            payload['domain'] = domain;
        }
        if (typeof isEuRegion !== 'undefined') {
            payload['isEuRegion'] = isEuRegion;
        }
        if (typeof fromName !== 'undefined') {
            payload['fromName'] = fromName;
        }
        if (typeof fromEmail !== 'undefined') {
            payload['fromEmail'] = fromEmail;
        }
        if (typeof replyToName !== 'undefined') {
            payload['replyToName'] = replyToName;
        }
        if (typeof replyToEmail !== 'undefined') {
            payload['replyToEmail'] = replyToEmail;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Update Mailgun provider
     *
     * Update a Mailgun provider by its unique ID.
     *
     * @param {string} providerId
     * @param {Object} params
     * @param {string} params.name
     * @param {string} params.apiKey
     * @param {string} params.domain
     * @param {boolean} params.isEuRegion
     * @param {boolean} params.enabled
     * @param {string} params.fromName
     * @param {string} params.fromEmail
     * @param {string} params.replyToName
     * @param {string} params.replyToEmail
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async updateMailgunProvider(
        providerId: string,
        params?: {
            name?: string;
            apiKey?: string;
            domain?: string;
            isEuRegion?: boolean;
            enabled?: boolean;
            fromName?: string;
            fromEmail?: string;
            replyToName?: string;
            replyToEmail?: string;
        }
    ): Promise<Models.Provider> {
        const { name, apiKey, domain, isEuRegion, enabled, fromName, fromEmail, replyToName, replyToEmail } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        const apiPath = '/messaging/providers/mailgun/{providerId}'.replace('{providerId}', providerId);
        const payload: Payload = {};
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }
        if (typeof domain !== 'undefined') {
            payload['domain'] = domain;
        }
        if (typeof isEuRegion !== 'undefined') {
            payload['isEuRegion'] = isEuRegion;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        if (typeof fromName !== 'undefined') {
            payload['fromName'] = fromName;
        }
        if (typeof fromEmail !== 'undefined') {
            payload['fromEmail'] = fromEmail;
        }
        if (typeof replyToName !== 'undefined') {
            payload['replyToName'] = replyToName;
        }
        if (typeof replyToEmail !== 'undefined') {
            payload['replyToEmail'] = replyToEmail;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create Msg91 provider
     *
     * Create a new MSG91 provider.
     *
     * @param {string} providerId
     * @param {string} name
     * @param {Object} params
     * @param {string} params.templateId
     * @param {string} params.senderId
     * @param {string} params.authKey
     * @param {boolean} params.enabled
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async createMsg91Provider(
        providerId: string, name: string,
        params?: {
            templateId?: string,
            senderId?: string,
            authKey?: string,
            enabled?: boolean
        }
    ): Promise<Models.Provider> {
        const { templateId, senderId, authKey, enabled } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }
        const apiPath = '/messaging/providers/msg91';
        const payload: Payload = {};
        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof templateId !== 'undefined') {
            payload['templateId'] = templateId;
        }
        if (typeof senderId !== 'undefined') {
            payload['senderId'] = senderId;
        }
        if (typeof authKey !== 'undefined') {
            payload['authKey'] = authKey;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Update Msg91 provider
     *
     * Update a MSG91 provider by its unique ID.
     *
     * @param {string} providerId
     * @param {Object} params
     * @param {string} params.name
     * @param {boolean} params.enabled
     * @param {string} params.templateId
     * @param {string} params.senderId
     * @param {string} params.authKey
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async updateMsg91Provider(
        providerId: string,
        params?: {
            name?: string,
            enabled?: boolean,
            templateId?: string,
            senderId?: string,
            authKey?: string
        }
    ): Promise<Models.Provider> {
        const { name, enabled, templateId, senderId, authKey } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        const apiPath = '/messaging/providers/msg91/{providerId}'.replace('{providerId}', providerId);
        const payload: Payload = {};
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        if (typeof templateId !== 'undefined') {
            payload['templateId'] = templateId;
        }
        if (typeof senderId !== 'undefined') {
            payload['senderId'] = senderId;
        }
        if (typeof authKey !== 'undefined') {
            payload['authKey'] = authKey;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create Sendgrid provider
     *
     * Create a new Sendgrid provider.
     *
     * @param {string} providerId
     * @param {string} name
     * @param {Object} params
     * @param {string} params.apiKey
     * @param {string} params.fromName
     * @param {string} params.fromEmail
     * @param {string} params.replyToName
     * @param {string} params.replyToEmail
     * @param {boolean} params.enabled
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async createSendgridProvider(
        providerId: string, name: string,
        params: {
            apiKey?: string,
            fromName?: string,
            fromEmail?: string,
            replyToName?: string,
            replyToEmail?: string,
            enabled?: boolean
        }
    ): Promise<Models.Provider> {
        const { apiKey, fromName, fromEmail, replyToName, replyToEmail, enabled } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }
        const apiPath = '/messaging/providers/sendgrid';
        const payload: Payload = {};
        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }
        if (typeof fromName !== 'undefined') {
            payload['fromName'] = fromName;
        }
        if (typeof fromEmail !== 'undefined') {
            payload['fromEmail'] = fromEmail;
        }
        if (typeof replyToName !== 'undefined') {
            payload['replyToName'] = replyToName;
        }
        if (typeof replyToEmail !== 'undefined') {
            payload['replyToEmail'] = replyToEmail;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Update Sendgrid provider
     *
     * Update a Sendgrid provider by its unique ID.
     *
     * @param {string} providerId
     * @param {Object} params
     * @param {string} params.name
     * @param {boolean} params.enabled
     * @param {string} params.apiKey
     * @param {string} params.fromName
     * @param {string} params.fromEmail
     * @param {string} params.replyToName
     * @param {string} params.replyToEmail
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async updateSendgridProvider(
        providerId: string,
        params?: {
            name?: string,
            enabled?: boolean,
            apiKey?: string,
            fromName?: string,
            fromEmail?: string,
            replyToName?: string,
            replyToEmail?: string
        }
    ): Promise<Models.Provider> {
        const { name, enabled, apiKey, fromName, fromEmail, replyToName, replyToEmail } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        const apiPath = '/messaging/providers/sendgrid/{providerId}'.replace('{providerId}', providerId);
        const payload: Payload = {};
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }
        if (typeof fromName !== 'undefined') {
            payload['fromName'] = fromName;
        }
        if (typeof fromEmail !== 'undefined') {
            payload['fromEmail'] = fromEmail;
        }
        if (typeof replyToName !== 'undefined') {
            payload['replyToName'] = replyToName;
        }
        if (typeof replyToEmail !== 'undefined') {
            payload['replyToEmail'] = replyToEmail;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create SMTP provider
     *
     * Create a new SMTP provider.
     *
     * @param {string} providerId
     * @param {string} name
     * @param {string} host
     * @param {Object} params
     * @param {number} params.port
     * @param {string} params.username
     * @param {string} params.password
     * @param {SmtpEncryption} params.encryption
     * @param {boolean} params.autoTLS
     * @param {string} params.mailer
     * @param {string} params.fromName
     * @param {string} params.fromEmail
     * @param {string} params.replyToName
     * @param {string} params.replyToEmail
     * @param {boolean} params.enabled
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async createSmtpProvider(
        providerId: string, name: string, host: string,
        params?: {
            port?: number,
            username?: string,
            password?: string,
            encryption?: SmtpEncryption,
            autoTLS?: boolean,
            mailer?: string,
            fromName?: string,
            fromEmail?: string,
            replyToName?: string,
            replyToEmail?: string,
            enabled?: boolean
        }
    ): Promise<Models.Provider> {
        const { port, username, password, encryption, autoTLS, mailer, fromName, fromEmail, replyToName, replyToEmail, enabled } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }
        if (typeof host === 'undefined') {
            throw new AppwriteException('Missing required parameter: "host"');
        }
        const apiPath = '/messaging/providers/smtp';
        const payload: Payload = {};
        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof host !== 'undefined') {
            payload['host'] = host;
        }
        if (typeof port !== 'undefined') {
            payload['port'] = port;
        }
        if (typeof username !== 'undefined') {
            payload['username'] = username;
        }
        if (typeof password !== 'undefined') {
            payload['password'] = password;
        }
        if (typeof encryption !== 'undefined') {
            payload['encryption'] = encryption;
        }
        if (typeof autoTLS !== 'undefined') {
            payload['autoTLS'] = autoTLS;
        }
        if (typeof mailer !== 'undefined') {
            payload['mailer'] = mailer;
        }
        if (typeof fromName !== 'undefined') {
            payload['fromName'] = fromName;
        }
        if (typeof fromEmail !== 'undefined') {
            payload['fromEmail'] = fromEmail;
        }
        if (typeof replyToName !== 'undefined') {
            payload['replyToName'] = replyToName;
        }
        if (typeof replyToEmail !== 'undefined') {
            payload['replyToEmail'] = replyToEmail;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Update SMTP provider
     *
     * Update a SMTP provider by its unique ID.
     *
     * @param {string} providerId
     * @param {Object} params
     * @param {string} params.name
     * @param {string} params.host
     * @param {number} params.port
     * @param {string} params.username
     * @param {string} params.password
     * @param {SmtpEncryption} params.encryption
     * @param {boolean} params.autoTLS
     * @param {string} params.mailer
     * @param {string} params.fromName
     * @param {string} params.fromEmail
     * @param {string} params.replyToName
     * @param {string} params.replyToEmail
     * @param {boolean} params.enabled
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async updateSmtpProvider(
        providerId: string,
        params?: {
            name?: string,
            host?: string,
            port?: number,
            username?: string,
            password?: string,
            encryption?: SmtpEncryption,
            autoTLS?: boolean,
            mailer?: string,
            fromName?: string,
            fromEmail?: string,
            replyToName?: string,
            replyToEmail?: string,
            enabled?: boolean
        }
    ): Promise<Models.Provider> {
        const { name, host, port, username, password, encryption, autoTLS, mailer, fromName, fromEmail, replyToName, replyToEmail, enabled } = params || {}

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        const apiPath = '/messaging/providers/smtp/{providerId}'.replace('{providerId}', providerId);
        const payload: Payload = {};
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof host !== 'undefined') {
            payload['host'] = host;
        }
        if (typeof port !== 'undefined') {
            payload['port'] = port;
        }
        if (typeof username !== 'undefined') {
            payload['username'] = username;
        }
        if (typeof password !== 'undefined') {
            payload['password'] = password;
        }
        if (typeof encryption !== 'undefined') {
            payload['encryption'] = encryption;
        }
        if (typeof autoTLS !== 'undefined') {
            payload['autoTLS'] = autoTLS;
        }
        if (typeof mailer !== 'undefined') {
            payload['mailer'] = mailer;
        }
        if (typeof fromName !== 'undefined') {
            payload['fromName'] = fromName;
        }
        if (typeof fromEmail !== 'undefined') {
            payload['fromEmail'] = fromEmail;
        }
        if (typeof replyToName !== 'undefined') {
            payload['replyToName'] = replyToName;
        }
        if (typeof replyToEmail !== 'undefined') {
            payload['replyToEmail'] = replyToEmail;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create Telesign provider
     *
     * Create a new Telesign provider.
     *
     * @param {string} providerId
     * @param {string} name
     * @param {Object} params
     * @param {string} params.from
     * @param {string} params.customerId
     * @param {string} params.apiKey
     * @param {boolean} params.enabled
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async createTelesignProvider(
        providerId: string, name: string,
        params?: {
            from?: string,
            customerId?: string,
            apiKey?: string,
            enabled?: boolean
        }
    ): Promise<Models.Provider> {
        const { from, customerId, apiKey, enabled } = params || {}

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }
        const apiPath = '/messaging/providers/telesign';
        const payload: Payload = {};
        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }
        if (typeof customerId !== 'undefined') {
            payload['customerId'] = customerId;
        }
        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Update Telesign provider
     *
     * Update a Telesign provider by its unique ID.
     *
     * @param {string} providerId
     * @param {Object} params
     * @param {string} params.name
     * @param {boolean} params.enabled
     * @param {string} params.customerId
     * @param {string} params.apiKey
     * @param {string} params.from
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async updateTelesignProvider(
        providerId: string,
        params?: {
            name?: string,
            enabled?: boolean,
            customerId?: string,
            apiKey?: string,
            from?: string
        }
    ): Promise<Models.Provider> {
        const { name, enabled, customerId, apiKey, from } = params || {}

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        const apiPath = '/messaging/providers/telesign/{providerId}'.replace('{providerId}', providerId);
        const payload: Payload = {};
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        if (typeof customerId !== 'undefined') {
            payload['customerId'] = customerId;
        }
        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }
        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create Textmagic provider
     *
     * Create a new Textmagic provider.
     *
     * @param {string} providerId
     * @param {string} name
     * @param {Object} params
     * @param {string} params.from
     * @param {string} params.username
     * @param {string} params.apiKey
     * @param {boolean} params.enabled
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async createTextmagicProvider(
        providerId: string, name: string,
        params?: {
            from?: string,
            username?: string,
            apiKey?: string,
            enabled?: boolean
        }
    ): Promise<Models.Provider> {
        const { from, username, apiKey, enabled } = params || {}

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }
        const apiPath = '/messaging/providers/textmagic';
        const payload: Payload = {};
        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }
        if (typeof username !== 'undefined') {
            payload['username'] = username;
        }
        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Update Textmagic provider
     *
     * Update a Textmagic provider by its unique ID.
     *
     * @param {string} providerId
     * @param {Object} params
     * @param {string} params.name
     * @param {boolean} params.enabled
     * @param {string} params.username
     * @param {string} params.apiKey
     * @param {string} params.from
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async updateTextmagicProvider(
        providerId: string,
        params?: {
            name?: string,
            enabled?: boolean,
            username?: string,
            apiKey?: string,
            from?: string
        }
    ): Promise<Models.Provider> {
        const { name, enabled, username, apiKey, from } = params || {}

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        const apiPath = '/messaging/providers/textmagic/{providerId}'.replace('{providerId}', providerId);
        const payload: Payload = {};
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        if (typeof username !== 'undefined') {
            payload['username'] = username;
        }
        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }
        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create Twilio provider
     *
     * Create a new Twilio provider.
     *
     * @param {string} providerId
     * @param {string} name
     * @param {Object} params
     * @param {string} params.from
     * @param {string} params.accountSid
     * @param {string} params.authToken
     * @param {boolean} params.enabled
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async createTwilioProvider(
        providerId: string, name: string,
        params?: {
            from?: string;
            accountSid?: string;
            authToken?: string;
            enabled?: boolean;
        }
    ): Promise<Models.Provider> {
        const { from, accountSid, authToken, enabled } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }
        const apiPath = '/messaging/providers/twilio';
        const payload: Payload = {};
        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }
        if (typeof accountSid !== 'undefined') {
            payload['accountSid'] = accountSid;
        }
        if (typeof authToken !== 'undefined') {
            payload['authToken'] = authToken;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Update Twilio provider
     *
     * Update a Twilio provider by its unique ID.
     *
     * @param {string} providerId
     * @param {Object} params
     * @param {string} params.name
     * @param {boolean} params.enabled
     * @param {string} params.accountSid
     * @param {string} params.authToken
     * @param {string} params.from
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async updateTwilioProvider(
        providerId: string,
        params?: {
            name?: string;
            enabled?: boolean;
            accountSid?: string;
            authToken?: string;
            from?: string;
        }
    ): Promise<Models.Provider> {
        const { name, enabled, accountSid, authToken, from } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        const apiPath = '/messaging/providers/twilio/{providerId}'.replace('{providerId}', providerId);
        const payload: Payload = {};
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        if (typeof accountSid !== 'undefined') {
            payload['accountSid'] = accountSid;
        }
        if (typeof authToken !== 'undefined') {
            payload['authToken'] = authToken;
        }
        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create Vonage provider
     *
     * Create a new Vonage provider.
     *
     * @param {string} providerId
     * @param {string} name
     * @param {Object} params
     * @param {string} params.from
     * @param {string} params.apiKey
     * @param {string} params.apiSecret
     * @param {boolean} params.enabled
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async createVonageProvider(
        providerId: string, name: string,
        params?: {
            from?: string;
            apiKey?: string;
            apiSecret?: string;
            enabled?: boolean;
        }
    ): Promise<Models.Provider> {
        const { from, apiKey, apiSecret, enabled } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }
        const apiPath = '/messaging/providers/vonage';
        const payload: Payload = {};
        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }
        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }
        if (typeof apiSecret !== 'undefined') {
            payload['apiSecret'] = apiSecret;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Update Vonage provider
     *
     * Update a Vonage provider by its unique ID.
     *
     * @param {string} providerId
     * @param {Object} params
     * @param {string} params.name
     * @param {boolean} params.enabled
     * @param {string} params.apiKey
     * @param {string} params.apiSecret
     * @param {string} params.from
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async updateVonageProvider(
        providerId: string,
        params?: {
            name?: string;
            enabled?: boolean;
            apiKey?: string;
            apiSecret?: string;
            from?: string;
        }
    ): Promise<Models.Provider> {
        const { name, enabled, apiKey, apiSecret, from } = params || {};

        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        const apiPath = '/messaging/providers/vonage/{providerId}'.replace('{providerId}', providerId);
        const payload: Payload = {};
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }
        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }
        if (typeof apiSecret !== 'undefined') {
            payload['apiSecret'] = apiSecret;
        }
        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Get provider
     *
     * Get a provider by its unique ID.

     *
     * @param {string} providerId
     * @throws {AppwriteException}
     * @returns {Promise<Models.Provider>}
     */
    async getProvider(providerId: string): Promise<Models.Provider> {
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        const apiPath = '/messaging/providers/{providerId}'.replace('{providerId}', providerId);
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Delete provider
     *
     * Delete a provider by its unique ID.
     *
     * @param {string} providerId
     * @throws {AppwriteException}
     * @returns {Promise<{}>}
     */
    async deleteProvider(providerId: string): Promise<{}> {
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        const apiPath = '/messaging/providers/{providerId}'.replace('{providerId}', providerId);
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'delete',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * List provider logs
     *
     * Get the provider activity logs listed by its unique ID.
     *
     * @param {string} providerId
     * @param {string[]} queries
     * @throws {AppwriteException}
     * @returns {Promise<Models.LogList>}
     */
    async listProviderLogs(providerId: string, queries?: string[]): Promise<Models.LogList> {
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }
        const apiPath = '/messaging/providers/{providerId}/logs'.replace('{providerId}', providerId);
        const payload: Payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * List subscriber logs
     *
     * Get the subscriber activity logs listed by its unique ID.
     *
     * @param {string} subscriberId
     * @param {string[]} queries
     * @throws {AppwriteException}
     * @returns {Promise<Models.LogList>}
     */
    async listSubscriberLogs(subscriberId: string, queries?: string[]): Promise<Models.LogList> {
        if (typeof subscriberId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "subscriberId"');
        }
        const apiPath = '/messaging/subscribers/{subscriberId}/logs'.replace('{subscriberId}', subscriberId);
        const payload: Payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * List topics
     *
     * Get a list of all topics from the current Appwrite project.
     *
     * @param {Object} params
     * @param {string[]} params.queries
     * @param {string} params.search
     * @throws {AppwriteException}
     * @returns {Promise<Models.TopicList>}
     */
    async listTopics(
        params?: {
            queries?: string[],
            search?: string
        }
    ): Promise<Models.TopicList> {
        const { queries, search } = params || {}

        const apiPath = '/messaging/topics';
        const payload: Payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        if (typeof search !== 'undefined') {
            payload['search'] = search;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create topic
     *
     * Create a new topic.
     *
     * @param {string} topicId
     * @param {string} name
     * @param {string[]} subscribe
     * @throws {AppwriteException}
     * @returns {Promise<Models.Topic>}
     */
    async createTopic(topicId: string, name: string, subscribe?: string[]): Promise<Models.Topic> {
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }
        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }
        const apiPath = '/messaging/topics';
        const payload: Payload = {};
        if (typeof topicId !== 'undefined') {
            payload['topicId'] = topicId;
        }
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof subscribe !== 'undefined') {
            payload['subscribe'] = subscribe;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Get topic
     *
     * Get a topic by its unique ID.

     *
     * @param {string} topicId
     * @throws {AppwriteException}
     * @returns {Promise<Models.Topic>}
     */
    async getTopic(topicId: string): Promise<Models.Topic> {
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }
        const apiPath = '/messaging/topics/{topicId}'.replace('{topicId}', topicId);
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Update topic
     *
     * Update a topic by its unique ID.

     *
     * @param {string} topicId
     * @param {Object} params
     * @param {string} params.name
     * @param {string[]} params.subscribe
     * @throws {AppwriteException}
     * @returns {Promise<Models.Topic>}
     */
    async updateTopic(
        topicId: string,
        params?: { name?: string, subscribe?: string[] }
    ): Promise<Models.Topic> {
        const { name, subscribe } = params || {}

        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }
        const apiPath = '/messaging/topics/{topicId}'.replace('{topicId}', topicId);
        const payload: Payload = {};
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof subscribe !== 'undefined') {
            payload['subscribe'] = subscribe;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Delete topic
     *
     * Delete a topic by its unique ID.
     *
     * @param {string} topicId
     * @throws {AppwriteException}
     * @returns {Promise<{}>}
     */
    async deleteTopic(topicId: string): Promise<{}> {
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }
        const apiPath = '/messaging/topics/{topicId}'.replace('{topicId}', topicId);
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'delete',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * List topic logs
     *
     * Get the topic activity logs listed by its unique ID.
     *
     * @param {string} topicId
     * @param {string[]} queries
     * @throws {AppwriteException}
     * @returns {Promise<Models.LogList>}
     */
    async listTopicLogs(topicId: string, queries?: string[]): Promise<Models.LogList> {
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }
        const apiPath = '/messaging/topics/{topicId}/logs'.replace('{topicId}', topicId);
        const payload: Payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * List subscribers
     *
     * Get a list of all subscribers from the current Appwrite project.
     *
     * @param {string} topicId
     * @param {Object} params
     * @param {string[]} params.queries
     * @param {string} params.search
     * @throws {AppwriteException}
     * @returns {Promise<Models.SubscriberList>}
     */
    async listSubscribers(
        topicId: string,
        params?: { queries?: string[], search?: string }
    ): Promise<Models.SubscriberList> {
        const { queries, search } = params || {}

        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }
        const apiPath = '/messaging/topics/{topicId}/subscribers'.replace('{topicId}', topicId);
        const payload: Payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        if (typeof search !== 'undefined') {
            payload['search'] = search;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Create subscriber
     *
     * Create a new subscriber.
     *
     * @param {string} topicId
     * @param {string} subscriberId
     * @param {string} targetId
     * @throws {AppwriteException}
     * @returns {Promise<Models.Subscriber>}
     */
    async createSubscriber(topicId: string, subscriberId: string, targetId: string): Promise<Models.Subscriber> {
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }
        if (typeof subscriberId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "subscriberId"');
        }
        if (typeof targetId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "targetId"');
        }
        const apiPath = '/messaging/topics/{topicId}/subscribers'.replace('{topicId}', topicId);
        const payload: Payload = {};
        if (typeof subscriberId !== 'undefined') {
            payload['subscriberId'] = subscriberId;
        }
        if (typeof targetId !== 'undefined') {
            payload['targetId'] = targetId;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Get subscriber
     *
     * Get a subscriber by its unique ID.

     *
     * @param {string} topicId
     * @param {string} subscriberId
     * @throws {AppwriteException}
     * @returns {Promise<Models.Subscriber>}
     */
    async getSubscriber(topicId: string, subscriberId: string): Promise<Models.Subscriber> {
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }
        if (typeof subscriberId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "subscriberId"');
        }
        const apiPath = '/messaging/topics/{topicId}/subscribers/{subscriberId}'.replace('{topicId}', topicId).replace('{subscriberId}', subscriberId);
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload,
        );
    }

    /**
     * Delete subscriber
     *
     * Delete a subscriber by its unique ID.
     *
     * @param {string} topicId
     * @param {string} subscriberId
     * @throws {AppwriteException}
     * @returns {Promise<{}>}
     */
    async deleteSubscriber(topicId: string, subscriberId: string): Promise<{}> {
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }
        if (typeof subscriberId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "subscriberId"');
        }
        const apiPath = '/messaging/topics/{topicId}/subscribers/{subscriberId}'.replace('{topicId}', topicId).replace('{subscriberId}', subscriberId);
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return await this.client.call(
            'delete',
            uri,
            apiHeaders,
            payload,
        );
    }
}
