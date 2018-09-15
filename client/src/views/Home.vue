<template>
  <div @submit.prevent="addMessage">
    <button @click="showMessageForm = !showMessageForm" type="button" class="btn btn-info mt-3">Toggle Message Form</button>
    <form v-if="showMessageForm">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="message.username" type="text" class="form-control" id="username">
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input type="text" v-model="message.subject" class="form-control" id="subject" placeholder="Enter a subject" required>
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea class="form-control" v-model="message.message" id="message" rows="3" required></textarea>
      </div>

      <div class="form-group">
        <label for="imageURL">ImageURL</label>
        <input type="text" v-model="message.imageURL" class="form-control" id="imageURL" placeholder="Enter an image URL">
      </div>
      <button type="submit" class="btn btn-success mb-3">Send Message!</button>
    </form>
    <ul class="list-unstyled mt-3">
      <li class="media" v-for="message in reversedMessages" :key="message._id">
        <img v-if="message.imageURL" class="mr-3" :src="message.imageURL" :alt="message.subject">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{message.username}}</h4>
          <h5 class="mt-0 mb-1">{{message.subject}}</h5>
          <p>{{message.message}} <br /></p>
          <small> {{message.created}} </small>
          <hr>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

const API_URL = 'http://localhost:1234/messages';

export default {
  name: 'home',
  data: () => ({
    showMessageForm: false,
    messages: [],
    message: {
      username: 'Anonymous',
      subject: '',
      message: '',
      imageURL: '',
    },
  }),
  mounted() {
    fetch(API_URL).then(response => response.json()).then((result) => {
      this.messages = result;
    });
  },
  computed: {
    reversedMessages(){
      return this.messages.slice().reverse();
    },
  },
  methods: {
    addMessage: function () {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json',
        },
      }).then(response => response.json()).then((result) => {
        this.messages.push(result);
      });
    },
  },
};
</script>

<style>
  hr{
    border-top: 1px solid white;
  }
  img {
    max-width: 150px;
    height: auto;
  }
</style>
