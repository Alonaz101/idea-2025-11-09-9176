class User {
  constructor(id, username, passwordHash) {
    this.id = id;
    this.username = username;
    this.passwordHash = passwordHash; // stored hashed and salted
    this.favorites = [];
    this.moodHistory = [];
  }
}

class Mood {
  constructor(userId, mood, timestamp = new Date()) {
    this.userId = userId;
    this.mood = mood;
    this.timestamp = timestamp;
  }
}

class Recipe {
  constructor(id, name, moodTags = [], dietaryTags = []) {
    this.id = id;
    this.name = name;
    this.moodTags = moodTags;
    this.dietaryTags = dietaryTags;
  }
}

class Favorite {
  constructor(userId, recipeId) {
    this.userId = userId;
    this.recipeId = recipeId;
  }
}

module.exports = { User, Mood, Recipe, Favorite };
