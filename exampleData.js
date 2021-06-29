const { ObjectID } = require("mongodb");

module.exports = {
    "accounts": {
        "_id": ObjectID(0),
        "email": "example@mail.com",
        "passwordHash": "12345678901234567890123456789012",
        "userTier": "free",
        "currentScheduleId": ObjectID(0),
        "stripeCustomerId": "123456789012345678"
    },

    "pendingAccounts": {
        "_id": ObjectID(0),
        "dateCreated": new Date(1624967198749),
        "email": "example2@mail.com",
        "passwordHash": "12345678901234567890123456789012"
    },

    "onlineAccounts": {
        "_id": ObjectID(0),
        "accountId": ObjectID(0),
        "dateCreated": new Date(1624967198749)
    },

    "schedules": {
        "_id": ObjectID(0),
        "accountId": ObjectID(0),
        "scheduleName": "example schedule",
        "people": {
            "jerry": {
                "categories": {
                    "admin": null
                }
            }
        }
    },

    "availabilities": {
        "_id": ObjectID(0),
        "scheduleId": ObjectID(0),
        "personName": "example person name",
        "startDate": new Date(1624967198749),
        "milliseconds": 1000,
        "rrule": "rrule string"
    },

    "pendingEvents": {
        "_id": ObjectID(0),
        "scheduleId": ObjectID(0),
        "startDate": new Date(1624967198749),
        "milliseconds": 1000,
        "rrule": "rrule string",
        "eventName": "taxes",
        "categories": {
            "admin": null
        }
    },

    "events": {
        "_id": ObjectID(0),
        "scheduleId": ObjectID(0),
        "startDate": new Date(1624967198749),
        "milliseconds": 1000,
        "rrule": "rrule string",
        "eventName": "taxes",
        "categories": {
            "admin": null
        },
        "appointee": "jerry"
    }
}