# HoyoAutoDailyCheckIn

Google App Script functions for Auto-check-in on HoyoLab (Genshin Impact, Honkai Star Rail and Honkai Impact 3rd).

### Multiple Accounts

Add objects, including boolean options for three games and your account's token to 'tokenList'.

<pre><code>
const tokenList = [
  {
    GI: true,
    HSR: true,
    BH3: false,
    token: "HOYOLAB_COOKIE_TOKEN_1",
  },
  {
    GI: false,
    HSR: false,
    BH3: true,
    token: "HOYOLAB_COOKIE_TOKEN_2",
  },
  //.. another account object
];
</code></pre>
