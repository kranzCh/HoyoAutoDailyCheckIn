# HoyoAutoDailyCheckIn

Google App Script functions for automatic check-ins on HoyoLab for Genshin Impact, Honkai Star Rail, Honkai Impact 3rd, and Zenless Zone Zero.

### Multiple Accounts

Add account objects to ‘tokenList’, including boolean options for three games and your account’s token.

<pre><code>
// Example
  
const tokenList = [
  {
    GI: true,
    HSR: true,
    BH3: false,
    ZZZ: true,
    token: "HOYOLAB_COOKIE_TOKEN_1",
  },
  {
    GI: false,
    HSR: false,
    BH3: false,
    ZZZ: true,
    token: "HOYOLAB_COOKIE_TOKEN_2",
  },
  //.. other account objects
];
</code></pre>
