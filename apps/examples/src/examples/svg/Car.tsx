import * as React from 'react';
import {
  Svg,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Path,
  G,
} from '@react-pdf/renderer';

const Car = () => (
  <Svg id="svg2" width="100%" height="600" viewBox="0 0 900 600">
    <Defs>
      <LinearGradient id="linearGradient4399">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient5360">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#ebf1f1" stopOpacity="1"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient5297">
        <Stop offset="0" stopColor="#dfa60e" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#dfa60e" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4695">
        <Stop offset="0" stopColor="#fffb86" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4424">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4298">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4371">
        <Stop offset="0" stopColor="#bdbdbd" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#bdbdbd" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4345">
        <Stop offset="0" stopColor="#dfeff5" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#dfeff5" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4337">
        <Stop offset="0" stopColor="#dfeff5" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#dfeff5" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4277">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4269">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4259">
        <Stop offset="0" stopColor="#dfeff5" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#dfeff5" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4247">
        <Stop offset="0" stopColor="#dfeff5" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#dfeff5" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4235">
        <Stop offset="0" stopColor="#dfeff5" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#dfeff5" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4273">
        <Stop offset="0" stopColor="#161616" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#161616" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4431">
        <Stop offset="0" stopColor="#1c1f24" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#373e48" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4278">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4270">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4262">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4254">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4246">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4238">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4228">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4147">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#d6e9e8" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4139">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4127">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4115">
        <Stop offset="0" stopColor="#fefefe" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fefefe" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4102">
        <Stop offset="0" stopColor="#fefefe" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fefefe" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4091">
        <Stop offset="0" stopColor="#fefefe" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fefefe" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4076">
        <Stop offset="0" stopColor="#d7d7d7" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#d7d7d7" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4781">
        <Stop offset="0" stopColor="#1a3451" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#1a3451" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4672">
        <Stop offset="0" stopColor="#e4e4e4" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#e4e4e4" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4662">
        <Stop offset="0" stopColor="#e3ecf6" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#e3ecf6" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4652">
        <Stop offset="0" stopColor="#e3ecf6" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#e3ecf6" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4642">
        <Stop offset="0" stopColor="#3f4e50" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#3f4e50" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4558">
        <Stop offset="0" stopColor="#131313" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#131313" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4479">
        <Stop offset="0" stopColor="#e3dcc1" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#e3dcc1" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4447">
        <Stop offset="0" stopColor="#0f0b03" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#0f0b03" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4433">
        <Stop offset="0" stopColor="#231002" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#231002" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4372">
        <Stop offset="0" stopColor="#e1e1e1" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#e1e1e1" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4362">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4291">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4281">
        <Stop offset="0" stopColor="#c7c7c7" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#c7c7c7" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4265">
        <Stop offset="0" stopColor="#bca714" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#bca714" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4253">
        <Stop offset="0" stopColor="#84750f" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#e5b027" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4231">
        <Stop offset="0" stopColor="#4b5657" stopOpacity="1"></Stop>
        <Stop offset="0.785" stopColor="#57524b" stopOpacity="0.665"></Stop>
        <Stop offset="1" stopColor="#4b5657" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4220">
        <Stop offset="0" stopColor="#637083" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#637083" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4207">
        <Stop offset="0" stopColor="#262e2e" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#262e2e" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4186">
        <Stop offset="0" stopColor="#262e2e" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#262e2e" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4114">
        <Stop offset="0" stopColor="#090b0b" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#090b0b" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4097">
        <Stop offset="0" stopColor="#e7ecec" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#e7ecec" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4085">
        <Stop offset="0" stopColor="#c5d0d1" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#c5d0d1" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3916">
        <Stop offset="0" stopColor="#8e8e8e" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#8e8e8e" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4402">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4312">
        <Stop offset="0" stopColor="#c9d4e7" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#c9d4e7" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4300">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4258">
        <Stop offset="0" stopColor="#dedede" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#dedede" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4232">
        <Stop offset="0" stopColor="#887077" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#887077" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4222">
        <Stop offset="0" stopColor="#282123" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#282123" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4212">
        <Stop offset="0" stopColor="#d5ccce" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#d5ccce" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4206">
        <Stop offset="0" stopColor="#281700" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0.235"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4192">
        <Stop offset="0" stopColor="#ede9ea" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#ede9ea" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4182">
        <Stop offset="0" stopColor="#746164" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#746164" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4151">
        <Stop offset="0" stopColor="#281700" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#5a3502" stopOpacity="0.237"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4143">
        <Stop offset="0" stopColor="#f9cb53" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fffffd" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4061">
        <Stop offset="0" stopColor="#d4d969" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#d4d969" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4061"
        id="linearGradient4067"
        x1="708.086"
        x2="710.521"
        y1="416.542"
        y2="423.02"
        gradientTransform="translate(-74.868 -105.378)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient id="linearGradient4069">
        <Stop offset="0" stopColor="#1f2116" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#1f2116" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4069"
        id="linearGradient4075"
        x1="713.037"
        x2="716.147"
        y1="416.542"
        y2="423.02"
        gradientTransform="translate(-74.868 -105.378)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient id="linearGradient4125">
        <Stop offset="0" stopColor="#1c1001" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4113">
        <Stop offset="0" stopColor="#f9c176" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#f9c176" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4000">
        <Stop offset="0" stopColor="#f0d866" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#f0d866" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3986">
        <Stop offset="0" stopColor="#6a510d" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#6a510d" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3967">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3957">
        <Stop offset="0" stopColor="#b6a038" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#b6a038" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3931">
        <Stop offset="0" stopColor="#1a1c23" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#1a1c23" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3921">
        <Stop offset="0" stopColor="#cab714" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#cab714" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3784">
        <Stop offset="0" stopColor="#e0e2e8" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#e0e2e8" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3774">
        <Stop offset="0" stopColor="#e0e2e8" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#e0e2e8" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3764">
        <Stop offset="0" stopColor="#b2b7c5" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#b2b7c5" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3732">
        <Stop offset="0" stopColor="#bfbfbf" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#bfbfbf" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3681">
        <Stop offset="0" stopColor="#d8f3f6" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#d8f3f6" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3887">
        <Stop offset="0" stopColor="#1b1815" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#1b1815" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3645">
        <Stop offset="0" stopColor="#c7eef2" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#c7eef2" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3708">
        <Stop offset="0" stopColor="#b4c1d1" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#b4c1d1" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3698">
        <Stop offset="0" stopColor="#405069" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#405069" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3687">
        <Stop offset="0" stopColor="#8190aa" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#8190aa" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3611">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3599">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3589">
        <Stop offset="0" stopColor="#443c30" stopOpacity="0"></Stop>
        <Stop offset="0" stopColor="#443c30" stopOpacity="0"></Stop>
        <Stop offset="1" stopColor="#303c44" stopOpacity="1"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3571">
        <Stop offset="0" stopColor="#565656" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#565656" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3549">
        <Stop offset="0" stopColor="#392b1b" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#392b1b" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3539">
        <Stop offset="0" stopColor="#392b1b" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#392b1b" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3529">
        <Stop offset="0" stopColor="#392b1b" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#392b1b" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3515">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3504">
        <Stop offset="0" stopColor="#1e1125" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#111d25" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3480">
        <Stop offset="0" stopColor="#676986" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#676986" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3462">
        <Stop offset="0" stopColor="#e0b80d" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#f6dc6d" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3443">
        <Stop offset="0" stopColor="#63441b" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#63441b" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3433">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3401">
        <Stop offset="0" stopColor="#00006b" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#00006b" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3393">
        <Stop offset="0" stopColor="#1a1400" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#544400" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3382">
        <Stop offset="0" stopColor="#e9fdff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#e9fdff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3374">
        <Stop offset="0" stopColor="#eaaa00" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#eaaa00" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3346">
        <Stop offset="0" stopColor="#00006b" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#00006b" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3328">
        <Stop offset="0" stopColor="#2e3f54" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#2e3f54" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3312">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3302">
        <Stop offset="0" stopColor="#bfac28" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#624715" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3292">
        <Stop offset="0" stopColor="#fbf6ed" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fbf6ed" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3284">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3276">
        <Stop offset="0" stopColor="#2c210b" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#2c210b" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3265">
        <Stop offset="0" stopColor="#e3eef8" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#e3eef8" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3254">
        <Stop offset="0" stopColor="#583116" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#583116" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3236">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3226">
        <Stop offset="0" stopColor="#4c1658" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#162458" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3212">
        <Stop offset="0" stopColor="#0d2133" stopOpacity="0"></Stop>
        <Stop offset="0.714" stopColor="#0d2133" stopOpacity="0"></Stop>
        <Stop offset="1" stopColor="#0d2133" stopOpacity="0.897"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3202">
        <Stop offset="0" stopColor="#ddbe3b" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#ddbe3b" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3176">
        <Stop offset="0" stopColor="#e3eef8" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#5295d2" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3160">
        <Stop offset="0" stopColor="#6f521d" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#6f521d" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3144">
        <Stop offset="0" stopColor="#a3e5e7" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#a3e5e7" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3135">
        <Stop offset="0" stopColor="#94b4e2" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#8a8925" stopOpacity="1"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4181">
        <Stop offset="0" stopColor="#1c2e3b" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#1c2e3b" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4166">
        <Stop offset="0" stopColor="#edd135" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#edec35" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4152">
        <Stop offset="0" stopColor="#1d1504" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#1d1504" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4144">
        <Stop offset="0" stopColor="#694312" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#977f1a" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4134">
        <Stop offset="0" stopColor="#92cadb" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#92cadb" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4124">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4100">
        <Stop offset="0" stopColor="#fdfbf9" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fdfbf9" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4078">
        <Stop offset="0" stopColor="#613c24" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#613c24" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4068">
        <Stop offset="0" stopColor="#709ac9" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#709ac9" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4040">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4022">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient4001">
        <Stop offset="0" stopColor="#201c14" stopOpacity="1"></Stop>
        <Stop offset="0.507" stopColor="#201c14" stopOpacity="0.498"></Stop>
        <Stop offset="1" stopColor="#201c14" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3989">
        <Stop offset="0" stopColor="#977f1a" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#977f1a" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3979">
        <Stop offset="0" stopColor="#201c14" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#201c14" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3869">
        <Stop offset="0" stopColor="#dfc61d" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#dfc61d" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3851">
        <Stop offset="0" stopColor="#7b6752" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#7b6752" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3833">
        <Stop offset="0" stopColor="#eff4f4" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#eff4f4" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3802">
        <Stop offset="0" stopColor="#e8ebf1" stopOpacity="0"></Stop>
        <Stop offset="0.819" stopColor="#e8ebf1" stopOpacity="0"></Stop>
        <Stop offset="1" stopColor="#e8ebf1" stopOpacity="1"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3782">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3747">
        <Stop offset="0" stopColor="#e6e1d7" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3733">
        <Stop offset="0" stopColor="#debe39" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#debe39" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3725">
        <Stop offset="0" stopColor="#6d899b" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#d9e6e6" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3713">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#d9e6e6" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3701">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3691">
        <Stop offset="0" stopColor="#021d2a" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#021d2a" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3668">
        <Stop offset="0" stopColor="#858b94" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#858b94" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3656">
        <Stop offset="0" stopColor="#d4f0fc" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#d4f0fc" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3638">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3610">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3578">
        <Stop offset="0" stopColor="#cce5f8" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#cce5f8" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3554">
        <Stop offset="0" stopColor="#e7eef4" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#b8f2f4" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3536">
        <Stop offset="0" stopColor="#030303" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#030303" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3526">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3516">
        <Stop offset="0" stopColor="#223f69" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#223f69" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3503">
        <Stop offset="0" stopColor="#2b4268" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#2b4268" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3489">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3471">
        <Stop offset="0" stopColor="#647e9d" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#64969d" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3461">
        <Stop offset="0" stopColor="#000" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#000" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3453">
        <Stop offset="0" stopColor="#e9f0f1" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#dddcca" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3303">
        <Stop offset="0" stopColor="#1f2429" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#1f2429" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3289">
        <Stop offset="0" stopColor="#97a4af" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#97a4af" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3279">
        <Stop offset="0" stopColor="#b3890d" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#b3890d" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3269">
        <Stop offset="0" stopColor="#6c6654" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#6c6654" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3263">
        <Stop offset="0" stopColor="#2a3737" stopOpacity="0.829"></Stop>
        <Stop offset="1" stopColor="#2a3737" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3255">
        <Stop offset="0" stopColor="#d09e1c" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fceeaf" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3201">
        <Stop offset="0" stopColor="#2a3737" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#2a3737" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3191">
        <Stop offset="0" stopColor="#f9dd67" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#f9dd67" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3173">
        <Stop offset="0" stopColor="#f6f6bf" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#f6f6bf" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3163">
        <Stop offset="0" stopColor="#635646" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#635646" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3155">
        <Stop offset="0" stopColor="#d5b42a" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#d5b42a" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3145">
        <Stop offset="0" stopColor="#fff" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3137">
        <Stop offset="0" stopColor="#c6c6e9" stopOpacity="0.235"></Stop>
        <Stop offset="1" stopColor="#fff" stopOpacity="0.789"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3127">
        <Stop offset="0" stopColor="#e4b125" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#f9dd67" stopOpacity="0.171"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3105">
        <Stop offset="0" stopColor="#fef7d9" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#fef7d9" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient id="linearGradient3097">
        <Stop offset="0" stopColor="#c09c07" stopOpacity="1"></Stop>
        <Stop offset="1" stopColor="#c09c07" stopOpacity="0"></Stop>
      </LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3097"
        id="linearGradient3103"
        x1="578.82"
        x2="549.177"
        y1="619.832"
        y2="293.018"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3105"
        id="linearGradient3111"
        x1="635.802"
        x2="592.544"
        y1="431.433"
        y2="354.186"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3137"
        id="linearGradient3143"
        x1="526.297"
        x2="520.667"
        y1="341.857"
        y2="331.979"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3145"
        id="linearGradient3151"
        x1="648.12"
        x2="155.123"
        y1="281.91"
        y2="396.756"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3155"
        id="linearGradient3161"
        x1="497.199"
        x2="369.676"
        y1="475.129"
        y2="284.239"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3163"
        id="linearGradient3169"
        x1="278.91"
        x2="630.341"
        y1="382.105"
        y2="313.813"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3173"
        id="linearGradient3179"
        x1="300.847"
        x2="585.625"
        y1="381.955"
        y2="299.948"
        gradientTransform="translate(-77.89 -100.39)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3191"
        id="linearGradient3197"
        x1="516.468"
        x2="474.345"
        y1="240.593"
        y2="316.924"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3263"
        id="linearGradient3207"
        x1="1062.22"
        x2="660.035"
        y1="561.752"
        y2="324.926"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3201"
        id="linearGradient3211"
        x1="480.532"
        x2="477.962"
        y1="592.433"
        y2="481.788"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3269"
        id="linearGradient3275"
        x1="708.28"
        x2="738.932"
        y1="348.272"
        y2="351.773"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3279"
        id="linearGradient3285"
        x1="704.078"
        x2="747.796"
        y1="383.286"
        y2="380.315"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3289"
        id="linearGradient3295"
        x1="302.664"
        x2="315.181"
        y1="551.522"
        y2="506.957"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3453"
        id="linearGradient3459"
        x1="688.764"
        x2="685.008"
        y1="185.161"
        y2="213.89"
        gradientTransform="matrix(1.17775 0 0 .5551 -194.578 -15.364)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3461"
        id="linearGradient3467"
        x1="674.721"
        x2="676.426"
        y1="299.554"
        y2="185.664"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3471"
        id="linearGradient3477"
        x1="742.419"
        x2="675.081"
        y1="250.532"
        y2="238.648"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3471"
        id="linearGradient3481"
        x1="462.151"
        x2="517.616"
        y1="242.609"
        y2="252.513"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3471"
        id="linearGradient3485"
        x1="469.083"
        x2="472.555"
        y1="283.052"
        y2="263.901"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3503"
        id="linearGradient3509"
        x1="684.874"
        x2="679.272"
        y1="164.613"
        y2="268.604"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3516"
        id="linearGradient3522"
        x1="563.317"
        x2="563.011"
        y1="192.752"
        y2="218.501"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3526"
        id="linearGradient3532"
        x1="642.98"
        x2="597.586"
        y1="146.955"
        y2="292.613"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3536"
        id="linearGradient3542"
        x1="631.775"
        x2="631.199"
        y1="196.675"
        y2="205.779"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3536"
        id="linearGradient3546"
        x1="730.515"
        x2="719.435"
        y1="231.689"
        y2="233.09"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3536"
        id="linearGradient3550"
        x1="720.01"
        x2="714.533"
        y1="212.781"
        y2="217.683"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3554"
        id="linearGradient3560"
        x1="488.218"
        x2="496.746"
        y1="234.49"
        y2="242.893"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3578"
        id="linearGradient3584"
        x1="615.005"
        x2="714.039"
        y1="219.211"
        y2="219.211"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3578"
        id="linearGradient3586"
        x1="504.086"
        x2="578.857"
        y1="233.819"
        y2="233.819"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3578"
        id="linearGradient3588"
        x1="480.318"
        x2="530.33"
        y1="235.8"
        y2="235.8"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3610"
        id="linearGradient3616"
        x1="629.552"
        x2="628.677"
        y1="200.914"
        y2="216.784"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3638"
        id="linearGradient3644"
        x1="745.993"
        x2="727.567"
        y1="222.65"
        y2="229.088"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3656"
        id="linearGradient3662"
        x1="774.535"
        x2="792.9"
        y1="222.195"
        y2="254.876"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3668"
        id="linearGradient3674"
        x1="783.613"
        x2="755.602"
        y1="277.358"
        y2="208.73"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3691"
        id="linearGradient3697"
        x1="742.331"
        x2="742.331"
        y1="238.501"
        y2="232.059"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3701"
        id="linearGradient3707"
        x1="749.855"
        x2="734.104"
        y1="250.38"
        y2="252.856"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3725"
        id="linearGradient3723"
        x1="776.611"
        x2="795.518"
        y1="253.198"
        y2="245.495"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3747"
        id="linearGradient3753"
        x1="799.269"
        x2="790.717"
        y1="250.611"
        y2="346.549"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3979"
        id="linearGradient3985"
        x1="443.115"
        x2="478.897"
        y1="426.194"
        y2="396.978"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4068"
        id="linearGradient4074"
        x1="511.032"
        x2="463.191"
        y1="481.892"
        y2="347.412"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3135"
        id="linearGradient3142"
        x1="209.316"
        x2="192.298"
        y1="339.378"
        y2="391.588"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3144"
        id="linearGradient3150"
        x1="207.218"
        x2="198.619"
        y1="344.353"
        y2="385.231"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3226"
        id="linearGradient3232"
        x1="211.99"
        x2="207.791"
        y1="342.223"
        y2="347.828"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3265"
        id="linearGradient3272"
        x1="203.117"
        x2="216.366"
        y1="349.285"
        y2="354.39"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3276"
        id="linearGradient3282"
        x1="203.603"
        x2="216.123"
        y1="354.094"
        y2="357.254"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3284"
        id="linearGradient3290"
        x1="183.48"
        x2="162.625"
        y1="437.745"
        y2="366.921"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3328"
        id="linearGradient3334"
        x1="205.426"
        x2="212.49"
        y1="366.938"
        y2="366.938"
        gradientTransform="translate(-76.44 -98.427)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3346"
        id="linearGradient3352"
        x1="204.909"
        x2="210.41"
        y1="367.282"
        y2="367.282"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3374"
        id="linearGradient3380"
        x1="167.644"
        x2="159.87"
        y1="395.646"
        y2="392.552"
        gradientTransform="translate(-77.697 -99.056)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3382"
        id="linearGradient3388"
        x1="155.133"
        x2="180.155"
        y1="377.425"
        y2="387.051"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3401"
        id="linearGradient3407"
        x1="204.909"
        x2="210.41"
        y1="367.282"
        y2="367.282"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3443"
        id="linearGradient3449"
        x1="197.689"
        x2="187.375"
        y1="388.727"
        y2="372.397"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3480"
        id="linearGradient3486"
        x1="484.08"
        x2="468.736"
        y1="415.622"
        y2="390.868"
        gradientTransform="rotate(-7.13 -370.763 989.778)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3529"
        id="linearGradient3535"
        x1="184.108"
        x2="214.535"
        y1="344.052"
        y2="344.052"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3539"
        id="linearGradient3545"
        x1="150.039"
        x2="177.748"
        y1="418.619"
        y2="418.619"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3549"
        id="linearGradient3555"
        x1="113.611"
        x2="159.87"
        y1="436.806"
        y2="397.612"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3571"
        id="linearGradient3577"
        x1="592.7"
        x2="574.765"
        y1="533.747"
        y2="460.543"
        gradientTransform="matrix(1.08124 .23375 -.1865 .99339 -76.47 -235.766)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3645"
        id="linearGradient3651"
        x1="575.841"
        x2="620.26"
        y1="502.138"
        y2="502.138"
        gradientTransform="translate(-77.842 -99.943)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3887"
        id="linearGradient3893"
        x1="621.141"
        x2="626.515"
        y1="428.826"
        y2="480.652"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3732"
        id="linearGradient3738"
        x1="815.762"
        x2="827.732"
        y1="361.48"
        y2="339.227"
        gradientTransform="rotate(1.887 3918.914 -1983.251)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3732"
        id="linearGradient3742"
        x1="815.762"
        x2="828.435"
        y1="361.48"
        y2="333.249"
        gradientTransform="rotate(180 789.421 321.688)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3732"
        id="linearGradient3746"
        x1="815.762"
        x2="828.435"
        y1="361.48"
        y2="333.249"
        gradientTransform="rotate(-177.489 787.207 323.142)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3764"
        id="linearGradient3762"
        x1="817.964"
        x2="838.041"
        y1="402.394"
        y2="379.011"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3774"
        id="linearGradient3780"
        x1="841.268"
        x2="825.565"
        y1="397.074"
        y2="364.524"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3784"
        id="linearGradient3791"
        x1="829.595"
        x2="823.867"
        y1="374.558"
        y2="367.763"
        gradientTransform="translate(-77.617 -103.623)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3921"
        id="linearGradient3927"
        x1="793.745"
        x2="810.66"
        y1="387.008"
        y2="365.622"
        gradientTransform="translate(-78.385 -101.33)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3931"
        id="linearGradient3945"
        x1="678.099"
        x2="668.188"
        y1="473.21"
        y2="455.422"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3957"
        id="linearGradient3963"
        x1="753.352"
        x2="756.972"
        y1="408.003"
        y2="412.575"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3967"
        id="linearGradient3973"
        x1="665.914"
        x2="835.642"
        y1="456.849"
        y2="384.238"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3986"
        id="linearGradient3992"
        x1="676.376"
        x2="698.508"
        y1="397.079"
        y2="395.338"
        gradientTransform="rotate(3.546 2054.668 -538.91)scale(.96427)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3986"
        id="linearGradient3996"
        x1="682.842"
        x2="686.572"
        y1="372.46"
        y2="376.19"
        gradientTransform="rotate(3.546 2054.668 -538.91)scale(.96427)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4000"
        id="linearGradient4006"
        x1="699.005"
        x2="690.551"
        y1="423.81"
        y2="412.993"
        gradientTransform="rotate(3.546 2054.668 -538.91)scale(.96427)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3986"
        id="linearGradient4026"
        x1="676.376"
        x2="698.508"
        y1="397.079"
        y2="395.338"
        gradientTransform="translate(12.66 -4.923)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3986"
        id="linearGradient4028"
        x1="682.842"
        x2="686.572"
        y1="372.46"
        y2="376.19"
        gradientTransform="translate(12.66 -4.923)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4000"
        id="linearGradient4030"
        x1="699.005"
        x2="690.551"
        y1="423.81"
        y2="412.993"
        gradientTransform="translate(12.66 -4.923)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3986"
        id="linearGradient4047"
        x1="676.376"
        x2="698.508"
        y1="397.079"
        y2="395.338"
        gradientTransform="scale(.90396)rotate(3.547 1999.258 534.806)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3986"
        id="linearGradient4049"
        x1="682.842"
        x2="686.572"
        y1="372.46"
        y2="376.19"
        gradientTransform="scale(.90396)rotate(3.547 1999.258 534.806)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4000"
        id="linearGradient4051"
        x1="699.005"
        x2="690.551"
        y1="423.81"
        y2="412.993"
        gradientTransform="scale(.90396)rotate(3.547 1999.258 534.806)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3986"
        id="linearGradient4053"
        x1="676.376"
        x2="698.508"
        y1="397.079"
        y2="395.338"
        gradientTransform="translate(12.66 -4.923)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3986"
        id="linearGradient4055"
        x1="682.842"
        x2="686.572"
        y1="372.46"
        y2="376.19"
        gradientTransform="translate(12.66 -4.923)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4000"
        id="linearGradient4057"
        x1="699.005"
        x2="690.551"
        y1="423.81"
        y2="412.993"
        gradientTransform="translate(12.66 -4.923)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4143"
        id="linearGradient4149"
        x1="427.686"
        x2="416.648"
        y1="512.701"
        y2="501.673"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4182"
        id="linearGradient4188"
        x1="419.102"
        x2="417.089"
        y1="506.691"
        y2="492.489"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4232"
        id="linearGradient4250"
        x1="417.876"
        x2="417.188"
        y1="509.769"
        y2="494.588"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4312"
        id="linearGradient4318"
        x1="805.679"
        x2="807.251"
        y1="286.579"
        y2="288.711"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4402"
        id="linearGradient4408"
        x1="800.951"
        x2="810.123"
        y1="285.134"
        y2="287.332"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3916"
        id="linearGradient4062"
        x1="286.061"
        x2="311.559"
        y1="573.175"
        y2="461.276"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3916"
        id="linearGradient4070"
        x1="277.109"
        x2="291.169"
        y1="593.565"
        y2="457.794"
        gradientTransform="translate(-77.682 -100.103)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4186"
        id="linearGradient4193"
        x1="264.137"
        x2="266.323"
        y1="490.369"
        y2="487.634"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4186"
        id="linearGradient4197"
        x1="267.618"
        x2="266.323"
        y1="484.65"
        y2="487.634"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4186"
        id="linearGradient4201"
        x1="269.608"
        x2="262.645"
        y1="486.639"
        y2="486.39"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4220"
        id="linearGradient4344"
        x1="637.584"
        x2="638.33"
        y1="250.102"
        y2="253.833"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4265"
        id="linearGradient4350"
        x1="594.565"
        x2="602.273"
        y1="267.15"
        y2="267.15"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4281"
        id="linearGradient4352"
        x1="644.671"
        x2="675.882"
        y1="249.688"
        y2="252.423"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4372"
        id="linearGradient4378"
        x1="678.925"
        x2="720.895"
        y1="266.698"
        y2="269.4"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4220"
        id="linearGradient4413"
        x1="637.584"
        x2="638.33"
        y1="250.102"
        y2="253.833"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4265"
        id="linearGradient4419"
        x1="594.565"
        x2="602.273"
        y1="267.15"
        y2="267.15"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4281"
        id="linearGradient4421"
        x1="644.671"
        x2="675.882"
        y1="249.688"
        y2="252.423"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4372"
        id="linearGradient4429"
        x1="678.925"
        x2="720.895"
        y1="266.698"
        y2="269.4"
        gradientTransform="matrix(.8587 .03886 -.04414 .83993 -121.838 -86.43)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4433"
        id="linearGradient4439"
        x1="668.061"
        x2="734.875"
        y1="253.421"
        y2="258.944"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4447"
        id="linearGradient4515"
        x1="608.903"
        x2="650.425"
        y1="276.42"
        y2="244.77"
        gradientTransform="translate(60.487 -133.634)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4479"
        id="linearGradient4523"
        x1="712.806"
        x2="753.963"
        y1="114.624"
        y2="136.258"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4558"
        id="linearGradient4564"
        x1="560"
        x2="635.595"
        y1="199.236"
        y2="275.052"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4642"
        id="linearGradient4823"
        x1="606.378"
        x2="609.515"
        y1="234.728"
        y2="217.819"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4652"
        id="linearGradient4825"
        x1="590.575"
        x2="591.067"
        y1="207.8"
        y2="221.514"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4662"
        id="linearGradient4827"
        x1="604.886"
        x2="609.515"
        y1="204.888"
        y2="217.819"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4781"
        id="linearGradient4833"
        x1="563.972"
        x2="565.73"
        y1="217.645"
        y2="226.789"
        gradientTransform="translate(-14.418 -60.487)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4076"
        id="linearGradient4083"
        x1="602.771"
        x2="602.771"
        y1="486.475"
        y2="433.986"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4091"
        id="linearGradient4098"
        x1="600.284"
        x2="597.3"
        y1="531.224"
        y2="501.892"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4102"
        id="linearGradient4109"
        x1="598.295"
        x2="615.529"
        y1="489.329"
        y2="466.452"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4115"
        id="linearGradient4123"
        x1="558.833"
        x2="597.3"
        y1="515.569"
        y2="490.702"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4127"
        id="linearGradient4135"
        x1="273.532"
        x2="264.585"
        y1="428.286"
        y2="413.864"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4139"
        id="linearGradient4145"
        x1="249.66"
        x2="257.617"
        y1="399.938"
        y2="425.302"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4147"
        id="linearGradient4153"
        x1="249.66"
        x2="277.019"
        y1="399.938"
        y2="413.864"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4228"
        id="linearGradient4234"
        x1="187.088"
        x2="244.762"
        y1="432.515"
        y2="432.515"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4362"
        id="linearGradient4236"
        x1="600.035"
        x2="607.744"
        y1="283.686"
        y2="283.686"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4238"
        id="linearGradient4244"
        x1="459.851"
        x2="477.137"
        y1="267.579"
        y2="267.579"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4246"
        id="linearGradient4252"
        x1="407.233"
        x2="431.147"
        y1="315.058"
        y2="315.058"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4254"
        id="linearGradient4260"
        x1="410.047"
        x2="480.38"
        y1="319.66"
        y2="319.66"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4262"
        id="linearGradient4268"
        x1="392.463"
        x2="409.343"
        y1="327.718"
        y2="327.718"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4270"
        id="linearGradient4276"
        x1="374.738"
        x2="399.496"
        y1="326.709"
        y2="326.709"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4278"
        id="linearGradient4284"
        x1="317.206"
        x2="407.419"
        y1="328.478"
        y2="328.478"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4431"
        id="linearGradient4438"
        x1="880.428"
        x2="738.358"
        y1="437.117"
        y2="833.835"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4273"
        id="linearGradient4279"
        x1="613.42"
        x2="605.159"
        y1="435.972"
        y2="501.443"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4235"
        id="linearGradient4243"
        x1="587.308"
        x2="618.753"
        y1="450.174"
        y2="426.07"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4247"
        id="linearGradient4256"
        x1="625.539"
        x2="638.988"
        y1="522.992"
        y2="490.168"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4259"
        id="linearGradient4266"
        x1="617.166"
        x2="629.435"
        y1="517.519"
        y2="486.685"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4269"
        id="linearGradient4275"
        x1="630.032"
        x2="625.077"
        y1="462.892"
        y2="442.501"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4277"
        id="linearGradient4283"
        x1="610.161"
        x2="619.283"
        y1="461.57"
        y2="461.57"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4337"
        id="linearGradient4343"
        x1="609.174"
        x2="620.719"
        y1="512.84"
        y2="485.984"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4345"
        id="linearGradient4351"
        x1="600.887"
        x2="612.921"
        y1="513.196"
        y2="483.853"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4371"
        id="linearGradient4377"
        x1="531.079"
        x2="531.079"
        y1="529.252"
        y2="461.088"
        gradientTransform="translate(-72.37 -100.736)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4371"
        id="linearGradient4381"
        x1="531.079"
        x2="531.079"
        y1="529.252"
        y2="461.088"
        gradientTransform="translate(-86.404 -100.068)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4371"
        id="linearGradient4385"
        x1="531.079"
        x2="531.079"
        y1="529.252"
        y2="461.088"
        gradientTransform="translate(-97.096 -100.068)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4298"
        id="linearGradient4307"
        x1="806.455"
        x2="742.049"
        y1="424.808"
        y2="422.235"
        gradientTransform="rotate(3.761 2262.553 -836.186)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4424"
        id="linearGradient4430"
        x1="551.877"
        x2="429.819"
        y1="567.982"
        y2="541.827"
        gradientTransform="translate(-78.385 -102.99)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3713"
        id="linearGradient5059"
        x1="798.319"
        x2="788.551"
        y1="234.291"
        y2="244.341"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient5297"
        id="linearGradient5303"
        x1="645.685"
        x2="583.466"
        y1="289.037"
        y2="294.498"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient5360"
        id="linearGradient5358"
        x1="294.232"
        x2="260.169"
        y1="394.538"
        y2="419.768"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3638"
        id="linearGradient3499"
        x1="745.993"
        x2="727.567"
        y1="222.65"
        y2="229.088"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4642"
        id="linearGradient3501"
        x1="606.378"
        x2="609.515"
        y1="234.728"
        y2="217.819"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4652"
        id="linearGradient3505"
        x1="590.575"
        x2="591.067"
        y1="207.8"
        y2="221.514"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4662"
        id="linearGradient3507"
        x1="604.886"
        x2="609.515"
        y1="204.888"
        y2="217.819"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4781"
        id="linearGradient3513"
        x1="563.972"
        x2="565.73"
        y1="217.645"
        y2="226.789"
        gradientTransform="translate(-14.418 -60.487)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient3713"
        id="linearGradient3517"
        x1="798.319"
        x2="788.551"
        y1="234.291"
        y2="244.341"
        gradientTransform="translate(-78.385 -99.4)"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <LinearGradient
        xlinkHref="#linearGradient4143"
        id="linearGradient3519"
        x1="427.686"
        x2="416.648"
        y1="512.701"
        y2="501.673"
        gradientUnits="userSpaceOnUse"
      ></LinearGradient>
      <RadialGradient
        xlinkHref="#linearGradient3127"
        id="radialGradient3133"
        cx="220.483"
        cy="374.91"
        r="109.139"
        fx="220.483"
        fy="374.91"
        gradientTransform="matrix(2.30693 -.8504 .10402 .28219 -405.54 334.458)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3255"
        id="radialGradient3261"
        cx="489.145"
        cy="481.274"
        r="124.737"
        fx="489.145"
        fy="481.274"
        gradientTransform="matrix(2.21266 -.78765 .2033 .57113 -761.098 427.206)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3289"
        id="radialGradient3299"
        cx="192.001"
        cy="427.626"
        r="104.798"
        fx="192.001"
        fy="427.626"
        gradientTransform="matrix(.16512 -.0461 .13426 .48095 -6.46 167.164)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3303"
        id="radialGradient3309"
        cx="140.157"
        cy="390.742"
        r="104.798"
        fx="140.157"
        fy="390.742"
        gradientTransform="matrix(.04066 -.13398 .48446 .14704 -45.651 342.52)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3489"
        id="radialGradient3495"
        cx="592.632"
        cy="238.648"
        r="136.423"
        fx="592.632"
        fy="238.648"
        gradientTransform="matrix(1 0 0 .30734 -78.385 65.9)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3733"
        id="radialGradient3743"
        cx="805.719"
        cy="280.532"
        r="21.205"
        fx="805.719"
        fy="280.532"
        gradientTransform="matrix(1.24064 -.84432 .61215 .8995 -444.165 606.874)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3782"
        id="radialGradient3790"
        cx="479.676"
        cy="392.987"
        r="25.254"
        fx="479.676"
        fy="392.987"
        gradientTransform="matrix(.78087 .59577 -.18518 .22076 174.458 15.688)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3782"
        id="radialGradient3794"
        cx="505.531"
        cy="557.568"
        r="25.254"
        fx="505.531"
        fy="557.568"
        gradientTransform="matrix(1.2605 -.38031 .09748 .29906 -299.829 369.895)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3782"
        id="radialGradient3798"
        cx="509.222"
        cy="371.019"
        r="25.254"
        fx="509.222"
        fy="371.019"
        gradientTransform="matrix(1.22222 -.07535 .01912 .28213 -169.128 321.024)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3802"
        id="radialGradient3808"
        cx="462.927"
        cy="412.081"
        r="25.254"
        fx="462.927"
        fy="412.081"
        gradientTransform="matrix(.96 0 0 1.2451 18.517 -101)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3833"
        id="radialGradient3839"
        cx="471.57"
        cy="412.081"
        r="25.254"
        fx="471.57"
        fy="412.081"
        gradientTransform="matrix(1 0 0 1.2451 0 -101)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3851"
        id="radialGradient3857"
        cx="473.019"
        cy="418.077"
        r="22.031"
        fx="473.019"
        fy="418.077"
        gradientTransform="matrix(.91056 -.41339 .62532 1.37739 -297.494 -69.606)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3869"
        id="radialGradient3875"
        cx="480.676"
        cy="403.629"
        r="17.331"
        fx="480.676"
        fy="403.629"
        gradientTransform="matrix(2.6861 .066 -.0133 .5416 -884.31 52.081)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4144"
        id="radialGradient3995"
        cx="450.768"
        cy="430.669"
        r="67.121"
        fx="450.768"
        fy="430.669"
        gradientTransform="matrix(1.21558 -.94133 .43538 .56222 -361.245 512.589)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3989"
        id="radialGradient3999"
        cx="481.894"
        cy="386.057"
        r="67.121"
        fx="481.894"
        fy="386.057"
        gradientTransform="matrix(1.42424 -.08376 .04175 .70986 -309.834 42.333)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4001"
        id="radialGradient4007"
        cx="473.05"
        cy="418.471"
        r="26.054"
        fx="473.05"
        fy="418.471"
        gradientTransform="matrix(1.7061 -.41466 .41738 1.7173 -579.058 -200.778)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4022"
        id="radialGradient4028"
        cx="479.822"
        cy="402.549"
        r="14.36"
        fx="479.822"
        fy="402.549"
        gradientTransform="matrix(1 0 0 1.24138 0 -99.767)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4022"
        id="radialGradient4032"
        cx="479.822"
        cy="402.549"
        r="14.36"
        fx="479.822"
        fy="402.549"
        gradientTransform="matrix(1 0 0 1.24138 0 -99.767)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4022"
        id="radialGradient4036"
        cx="479.822"
        cy="402.549"
        r="14.36"
        fx="479.822"
        fy="402.549"
        gradientTransform="matrix(1 0 0 1.24138 0 -99.767)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4040"
        id="radialGradient4046"
        cx="466.948"
        cy="413.814"
        r="8.418"
        fx="466.948"
        fy="413.814"
        gradientTransform="matrix(1 0 0 .58823 0 170.394)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4040"
        id="radialGradient4050"
        cx="466.948"
        cy="413.814"
        r="8.418"
        fx="466.948"
        fy="413.814"
        gradientTransform="matrix(1 0 0 .58823 0 170.394)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4040"
        id="radialGradient4054"
        cx="466.948"
        cy="413.814"
        r="8.418"
        fx="466.948"
        fy="413.814"
        gradientTransform="matrix(1 0 0 .58823 0 170.394)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4040"
        id="radialGradient4058"
        cx="466.948"
        cy="413.814"
        r="8.418"
        fx="466.948"
        fy="413.814"
        gradientTransform="matrix(1 0 0 .58823 0 170.394)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4078"
        id="radialGradient4084"
        cx="460.501"
        cy="492.96"
        r="67.116"
        fx="460.501"
        fy="492.96"
        gradientTransform="matrix(.97916 -.20308 .11477 .55337 -125.367 203.222)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4078"
        id="radialGradient4088"
        cx="425.973"
        cy="336.024"
        r="67.116"
        fx="425.973"
        fy="336.024"
        gradientTransform="matrix(.97916 -.20308 .11477 .55337 -125.367 203.222)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4078"
        id="radialGradient4092"
        cx="426.521"
        cy="404.561"
        r="67.116"
        fx="426.521"
        fy="404.561"
        gradientTransform="matrix(.97916 -.20308 .11477 .55337 -125.367 203.222)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4100"
        id="radialGradient4106"
        cx="419.17"
        cy="447.712"
        r="67.116"
        fx="419.17"
        fy="447.712"
        gradientTransform="matrix(1.28171 -1.16916 .55588 .6094 -443.233 538.773)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4124"
        id="radialGradient4130"
        cx="381.115"
        cy="426.09"
        r="50.98"
        fx="381.115"
        fy="426.09"
        gradientTransform="matrix(1.47594 .04857 -.0306 .92996 -246.735 -88.548)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4134"
        id="radialGradient4140"
        cx="398.834"
        cy="426.792"
        r="37.413"
        fx="398.834"
        fy="426.792"
        gradientTransform="matrix(.19265 .17206 -.80304 .89912 586.346 -124.04)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4152"
        id="radialGradient4158"
        cx="440.319"
        cy="445.031"
        r="60.556"
        fx="440.319"
        fy="445.031"
        gradientTransform="matrix(1 0 0 .6259 -78.385 67.09)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4166"
        id="radialGradient4172"
        cx="414.657"
        cy="480.4"
        r="67.121"
        fx="414.657"
        fy="480.4"
        gradientTransform="matrix(1.24358 -.23873 .04606 .23991 -201.514 355.73)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4181"
        id="radialGradient4187"
        cx="472.576"
        cy="413.274"
        r="18.667"
        fx="472.576"
        fy="413.274"
        gradientTransform="matrix(1.30812 -.16364 .0425 .33976 -241.255 249.97)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3160"
        id="radialGradient3166"
        cx="205.999"
        cy="367.332"
        r="13.572"
        fx="205.999"
        fy="367.332"
        gradientTransform="matrix(.84222 -.53914 1.03895 1.623 -427.522 -218.898)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3176"
        id="radialGradient3182"
        cx="207.704"
        cy="368.071"
        r="14.071"
        fx="207.704"
        fy="368.071"
        gradientTransform="matrix(.81183 .5839 -1.45132 2.01785 494.891 -595.318)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3202"
        id="radialGradient3208"
        cx="204.737"
        cy="362.011"
        r="12.205"
        fx="197.861"
        fy="357.639"
        gradientTransform="matrix(1 0 0 .74648 -81.194 -13.406)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3212"
        id="radialGradient3218"
        cx="201.209"
        cy="362.693"
        r="13.572"
        fx="201.209"
        fy="362.693"
        gradientTransform="matrix(1.52596 .18616 -.16188 1.32694 -126.416 -254.503)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3236"
        id="radialGradient3242"
        cx="164.463"
        cy="330.811"
        r="8.144"
        fx="164.463"
        fy="330.811"
        gradientTransform="matrix(1 0 0 .1194 0 291.311)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3236"
        id="radialGradient3246"
        cx="164.463"
        cy="330.811"
        r="8.144"
        fx="164.463"
        fy="330.811"
        gradientTransform="matrix(1 0 0 .1194 0 291.311)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3236"
        id="radialGradient3250"
        cx="164.463"
        cy="330.811"
        r="8.144"
        fx="164.463"
        fy="330.811"
        gradientTransform="matrix(1 0 0 .1194 0 291.311)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3254"
        id="radialGradient3260"
        cx="211.094"
        cy="354.807"
        r="24.675"
        fx="211.094"
        fy="354.807"
        gradientTransform="matrix(.51531 -.857 1.46801 .88272 -496.932 118.39)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3292"
        id="radialGradient3298"
        cx="163.869"
        cy="385.37"
        r="36.718"
        fx="163.869"
        fy="385.37"
        gradientTransform="matrix(.42716 .33301 -1.13757 1.45917 457.896 -331.15)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3302"
        id="radialGradient3308"
        cx="194.203"
        cy="375.725"
        r="36.718"
        fx="194.203"
        fy="375.725"
        gradientTransform="matrix(.6971 .71697 -1 .97228 359.08 -223.275)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3312"
        id="radialGradient3318"
        cx="196.314"
        cy="364.188"
        r="9.97"
        fx="196.314"
        fy="364.188"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3312"
        id="radialGradient3322"
        cx="196.314"
        cy="364.188"
        r="9.97"
        fx="196.314"
        fy="364.188"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3393"
        id="radialGradient3399"
        cx="188.527"
        cy="375.744"
        r="13.306"
        fx="188.527"
        fy="375.744"
        gradientTransform="matrix(1.13505 .87521 -1.28423 1.66551 378.818 -514.278)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3433"
        id="radialGradient3439"
        cx="196.485"
        cy="386.555"
        r="3.76"
        fx="196.485"
        fy="386.555"
        gradientTransform="matrix(.29424 -.23795 2.0831 2.5758 -744.773 -659.565)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3462"
        id="radialGradient3468"
        cx="173.966"
        cy="382.582"
        r="4.126"
        fx="173.966"
        fy="382.582"
        gradientTransform="matrix(1 0 0 4.54167 0 -1354.977)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3504"
        id="radialGradient3510"
        cx="205.526"
        cy="385.104"
        r="36.367"
        fx="205.526"
        fy="385.104"
        gradientTransform="matrix(.82996 .55782 -.93594 1.39254 316.996 -364.148)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3515"
        id="radialGradient3521"
        cx="154.325"
        cy="447.325"
        r="36.367"
        fx="154.325"
        fy="447.325"
        gradientTransform="matrix(.45869 -.28226 .06122 .09948 -14.005 316.432)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3515"
        id="radialGradient3525"
        cx="300.194"
        cy="73.224"
        r="36.367"
        fx="300.194"
        fy="73.224"
        gradientTransform="matrix(.40196 .1148 -.03208 .11231 9.854 196.295)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3589"
        id="radialGradient3595"
        cx="602.947"
        cy="490.518"
        r="43.516"
        fx="602.947"
        fy="490.518"
        gradientTransform="matrix(1.5013 -.05412 .20617 3.29523 -399.074 -1075.738)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3599"
        id="radialGradient3605"
        cx="593.913"
        cy="482.753"
        r="43.516"
        fx="593.913"
        fy="482.753"
        gradientTransform="matrix(1 0 0 2.16201 0 -560.965)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3611"
        id="radialGradient3617"
        cx="619.237"
        cy="398.238"
        r="23.541"
        fx="619.237"
        fy="398.238"
        gradientTransform="matrix(1.72333 0 0 .48238 -536.503 98.602)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3611"
        id="radialGradient3621"
        cx="619.237"
        cy="398.238"
        r="23.541"
        fx="619.237"
        fy="398.238"
        gradientTransform="matrix(1.67904 2.05966 -.49851 .54354 -281.37 -1180.781)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3687"
        id="radialGradient3693"
        cx="620.077"
        cy="485.957"
        r="21.114"
        fx="620.077"
        fy="485.957"
        gradientTransform="matrix(.99208 .08938 -.10416 1.2596 56.93 -155.101)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3698"
        id="radialGradient3704"
        cx="605.287"
        cy="502.169"
        r="21.114"
        fx="605.287"
        fy="502.169"
        gradientTransform="matrix(.53617 -.6447 1.51465 1.7579 -479.86 42.184)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3708"
        id="radialGradient3714"
        cx="605.426"
        cy="495.91"
        r="22.316"
        fx="605.426"
        fy="495.91"
        gradientTransform="matrix(1.09959 -1.30095 .79959 .67583 -535.2 863.325)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient3681"
        id="radialGradient3917"
        cx="597.915"
        cy="528.538"
        r="26.297"
        fx="597.915"
        fy="528.538"
        gradientTransform="matrix(1 0 0 .79562 0 108.022)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4113"
        id="radialGradient4119"
        cx="526.596"
        cy="412.699"
        r="12.64"
        fx="526.596"
        fy="412.699"
        gradientTransform="matrix(1.12505 -.19936 .03695 .20851 -159.483 335.711)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4125"
        id="radialGradient4123"
        cx="526.922"
        cy="464.452"
        r="12.64"
        fx="526.922"
        fy="464.452"
        gradientTransform="matrix(1.38908 0 0 .39346 -281.24 145.102)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4151"
        id="radialGradient4157"
        cx="428.298"
        cy="492.748"
        r="19.732"
        fx="428.298"
        fy="492.748"
        gradientTransform="matrix(2.00814 .10222 .1293 .84855 -493.55 33.794)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4192"
        id="radialGradient4198"
        cx="422.664"
        cy="503.637"
        r="5.565"
        fx="422.664"
        fy="503.637"
        gradientTransform="matrix(1.49026 -.21419 .24752 1.72219 -409.517 -372.308)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4206"
        id="radialGradient4204"
        cx="423.858"
        cy="490.216"
        r="19.732"
        fx="423.858"
        fy="490.216"
        gradientTransform="matrix(1.1468 .00084 .0709 .83586 -99.829 82.988)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4212"
        id="radialGradient4218"
        cx="410.426"
        cy="502.762"
        r="4.849"
        fx="410.426"
        fy="502.762"
        gradientTransform="matrix(.98983 .14227 -.36677 2.55183 188.574 -838.593)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4222"
        id="radialGradient4228"
        cx="405.577"
        cy="504.226"
        r="4.849"
        fx="405.577"
        fy="504.226"
        gradientTransform="matrix(1 0 0 1.35897 0 -180.479)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4232"
        id="radialGradient4238"
        cx="410.426"
        cy="506.605"
        r="4.849"
        fx="410.426"
        fy="506.605"
        gradientTransform="matrix(1 0 0 1.35897 0 -180.479)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4258"
        id="radialGradient4264"
        cx="149.969"
        cy="441.128"
        r="2.919"
        fx="149.969"
        fy="441.128"
        gradientTransform="matrix(1 0 0 1.98681 -78.385 -534.71)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4300"
        id="radialGradient4306"
        cx="420.249"
        cy="498.162"
        r="1.492"
        fx="420.249"
        fy="498.162"
        gradientTransform="matrix(1 0 0 1.5 0 -249.081)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4085"
        id="radialGradient4093"
        cx="219.184"
        cy="463.985"
        r="105.508"
        fx="219.184"
        fy="463.985"
        gradientTransform="matrix(1 0 0 .40281 -78.385 190.197)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4097"
        id="radialGradient4105"
        cx="340.862"
        cy="590.446"
        r="105.508"
        fx="340.862"
        fy="590.446"
        gradientTransform="matrix(.9968 .0799 -.02 .2495 -65.487 253.49)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4114"
        id="radialGradient4120"
        cx="187.42"
        cy="418.411"
        r="104.798"
        fx="187.42"
        fy="418.411"
        gradientTransform="matrix(.15772 .05034 -.11371 .3563 127.053 202.284)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4097"
        id="radialGradient4180"
        cx="182.487"
        cy="328.248"
        r="105.508"
        fx="182.487"
        fy="328.248"
        gradientTransform="matrix(.9968 .0799 -.02 .2495 -65.487 253.49)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4207"
        id="radialGradient4213"
        cx="476.249"
        cy="402.012"
        r="67.121"
        fx="476.249"
        fy="402.012"
        gradientTransform="matrix(1 0 0 .83494 -78.385 -29.112)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4231"
        id="radialGradient4346"
        cx="676.019"
        cy="273.289"
        r="60.178"
        fx="676.019"
        fy="273.289"
        gradientTransform="matrix(.86316 0 0 .10929 92.862 227.447)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4253"
        id="radialGradient4348"
        cx="603.651"
        cy="286.454"
        r="60.178"
        fx="603.651"
        fy="286.454"
        gradientTransform="matrix(.29433 -.11576 .037 .09406 418.732 306.329)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4291"
        id="radialGradient4354"
        cx="604.511"
        cy="257.576"
        r="3.233"
        fx="604.511"
        fy="257.576"
        gradientTransform="matrix(1 0 0 .5 0 128.788)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4291"
        id="radialGradient4356"
        cx="604.511"
        cy="257.576"
        r="3.233"
        fx="604.511"
        fy="257.576"
        gradientTransform="matrix(1 0 0 .5 0 128.788)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4231"
        id="radialGradient4415"
        cx="676.019"
        cy="273.289"
        r="60.178"
        fx="676.019"
        fy="273.289"
        gradientTransform="matrix(.86316 0 0 .10929 92.862 227.447)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4253"
        id="radialGradient4417"
        cx="603.651"
        cy="286.454"
        r="60.178"
        fx="603.651"
        fy="286.454"
        gradientTransform="matrix(.29433 -.11576 .037 .09406 418.732 306.329)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4291"
        id="radialGradient4423"
        cx="604.511"
        cy="257.576"
        r="3.233"
        fx="604.511"
        fy="257.576"
        gradientTransform="matrix(1 0 0 .5 0 128.788)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4291"
        id="radialGradient4425"
        cx="604.511"
        cy="257.576"
        r="3.233"
        fx="604.511"
        fy="257.576"
        gradientTransform="matrix(1 0 0 .5 0 128.788)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4447"
        id="radialGradient4517"
        cx="747.15"
        cy="166.782"
        r="39.927"
        fx="747.15"
        fy="166.782"
        gradientTransform="matrix(-.51429 -.5953 .18282 -.15794 1100.91 615.382)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4447"
        id="radialGradient4519"
        cx="683.797"
        cy="134.886"
        r="39.927"
        fx="683.797"
        fy="134.886"
        gradientTransform="matrix(.73986 -.32014 .11748 .27151 161.536 317.336)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4447"
        id="radialGradient4521"
        cx="709.059"
        cy="210.962"
        r="39.927"
        fx="709.059"
        fy="210.962"
        gradientTransform="matrix(.40146 .07086 -.01525 .08642 436.108 54.692)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4672"
        id="radialGradient4829"
        cx="590.426"
        cy="211.723"
        r="4.106"
        fx="590.426"
        fy="211.723"
        gradientTransform="matrix(2 0 0 .97942 -590.426 4.357)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4672"
        id="radialGradient4831"
        cx="594.532"
        cy="215.829"
        r="4.106"
        fx="594.532"
        fy="215.829"
        gradientTransform="matrix(.88652 0 0 .97942 71.572 4.357)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4695"
        id="radialGradient4701"
        cx="552.008"
        cy="340.004"
        r="31.367"
        fx="552.008"
        fy="340.004"
        gradientTransform="matrix(-.4271 1.49623 -.74213 -.21184 956.988 -512.885)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4399"
        id="radialGradient4405"
        cx="739.799"
        cy="216.445"
        r="35.907"
        fx="739.799"
        fy="216.445"
        gradientTransform="matrix(.80948 .3715 -.14024 .30557 92.801 -233.564)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4672"
        id="radialGradient3509"
        cx="590.426"
        cy="211.723"
        r="4.106"
        fx="590.426"
        fy="211.723"
        gradientTransform="matrix(2 0 0 .97942 -590.426 4.357)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
      <RadialGradient
        xlinkHref="#linearGradient4672"
        id="radialGradient3511"
        cx="594.532"
        cy="215.829"
        r="4.106"
        fx="594.532"
        fy="215.829"
        gradientTransform="matrix(.88652 0 0 .97942 71.572 4.357)"
        gradientUnits="userSpaceOnUse"
      ></RadialGradient>
    </Defs>
    <G fillOpacity="1" strokeLinejoin="miter" strokeOpacity="1" opacity="1">
      <Path
        fill="url(#linearGradient4438)"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M995.928 476.826a445.917 154.735 0 1 1-891.834 0 445.917 154.735 0 1 1 891.834 0"
        opacity="0.762"
        transform="rotate(-10.481 -52.246 958.069)"
      ></Path>
      <Path
        fill="#06060a"
        fillRule="evenodd"
        stroke="#000"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M164.838 433.188s40.098 15.947 77.016 28.976 168.378 25.315 181.408 25.315 59.9 13.19 79.265 9.772c18.459-3.257 36.918-22.802 36.918-22.802s3.257-45.604 33.66-60.806S673 352.838 683.858 350.666s41.261-8.686 41.261-8.686l26.06-15.202s-10.858-26.06-21.717-26.06-47.775-6.514-112.924 4.344c-65.15 10.858-349.633 45.604-377.865 58.634-28.23 13.03-93.38 43.432-93.38 43.432z"
        opacity="0.974"
      ></Path>
    </G>
    <G strokeOpacity="1" opacity="1">
      <Path
        fill="url(#linearGradient4307)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M703.369 289.218c45.73-9.307 71.52-9.186 51.277 27.46 3.042.143-8.03 9.305-5.09 8.465.615-.294 2.412-.713 1.083.185-2.045 1.654-4.357 2.962-6.703 4.14-11.735 3.349-61.6 5.221-100.762-1.81-1.112-2.109-.518-7.256 1.895-13.62 4.8-13.586 11.438-28.348 13.824-30.354 2.773-2.007 5.48-2.726 7.992-3.431 1.72-.204 3.293-.365 4.94-.127 3.274 1.143 7.028 4.657 10.047 6.314 2.38 1.484 4.958 3.278 7.657 5.237.458-.022 1.072-.01 1.553 1.437.786 1.256 11.243-4.428 12.287-3.896"
        opacity="0.852"
      ></Path>
      <Path
        fill="url(#linearGradient4430)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M507.314 479.377c-60.785 2.908-121.798-2.93-182.598-11.852-10.537-2.814-19.721-9.716-25.975-18.576-2.48-2.91-4.932-5.843-7.423-8.743-2.781-5.359-.112-12.182 4.628-15.475 11.46-11.661 27.405-17.893 43.372-20.162 24.423-3.996 48.138-12.857 73.116-12.99 13.311-.084 26.376 2.805 39.28 5.758 13.383 2.941 26.787 6.075 39.636 10.896 11.11 4.94 21.772 12.24 28.059 22.882 2.749 6.856 20.31.432 21.301 7.58.068 6.488-8.164 23.41-14.196 25.58-2.98 1.73-15.778 14.179-19.2 15.102"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M522.71 392.797c-6.914 36.821 4.088 71.673-14.079 82.113-7.286 4.188-42.113-2.08-49.548-3.687-25.972-5.615-40.163-47.18-30.477-98.77s38.626-88.904 64.599-83.29c25.972 5.616 39.19 52.043 29.504 103.634"
        color="#000"
        visibility="visible"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M268.954 429.008s159.094 22.694 299.72-47.619c162.465-81.232 198.505-132.865 202.706-141.268 4.202-8.404 10.18-56.21-3.827-59.012-14.005-2.8-65.826-11.204-100.84 7.003s-210.084 86.835-219.888 96.639-155.462 131.652-177.87 144.257"
      ></Path>
      <Path
        fill="url(#linearGradient3577)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M522.71 392.797c-6.914 36.821 4.088 71.673-14.079 82.113-7.286 4.188-42.113-2.08-49.548-3.687-25.972-5.615-40.163-47.18-30.477-98.77s38.626-88.904 64.599-83.29c25.972 5.616 39.19 52.043 29.504 103.634"
        color="#000"
        opacity="0.535"
        visibility="visible"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M637.43 482.753a43.516 94.083 0 1 1-87.033 0 43.516 94.083 0 1 1 87.032 0"
        color="#000"
        opacity="1"
        transform="matrix(1.08124 .23375 -.1865 .99339 -37.573 -235.766)"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#radialGradient3595)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M637.43 482.753a43.516 94.083 0 1 1-87.033 0 43.516 94.083 0 1 1 87.032 0"
        color="#000"
        opacity="1"
        transform="matrix(1.08124 .23375 -.1865 .99339 -37.573 -235.766)"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#radialGradient3605)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M637.43 482.753a43.516 94.083 0 1 1-87.033 0 43.516 94.083 0 1 1 87.032 0"
        color="#000"
        opacity="1"
        transform="matrix(.7777 .19023 -.13415 .80845 126.663 -119.18)"
        visibility="visible"
      ></Path>
      <Path
        fill="#c1c1c1"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeLinecap="round"
        strokeWidth="0.5"
        d="M553.064 408.785c-2.984 15.648-19.07 46.347-33.373 46.347-14.304 0-25.913-12.297-25.913-27.449 0-15.151 11.609-27.448 25.913-27.448s34.865-6.602 33.373 8.55"
        opacity="0.417"
      ></Path>
      <Path
        fill="#2b3034"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M626.899 482.279a21.114 55.665 0 1 1-42.228 0 21.114 55.665 0 1 1 42.228 0"
        color="#000"
        opacity="1"
        transform="matrix(1.30617 .35672 -.22955 1.07491 -154.298 -347.017)"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#radialGradient3693)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M626.899 482.279a21.114 55.665 0 1 1-42.228 0 21.114 55.665 0 1 1 42.228 0"
        color="#000"
        opacity="1"
        transform="matrix(1.30617 .35672 -.22955 1.07491 -154.298 -347.017)"
        visibility="visible"
      ></Path>
      <Path
        fill="#212e3d"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M626.899 482.279a21.114 55.665 0 1 1-42.228 0 21.114 55.665 0 1 1 42.228 0"
        color="#000"
        opacity="1"
        transform="matrix(1.17368 .32054 -.20627 .96588 -87.616 -273.668)"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#radialGradient3704)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M626.899 482.279a21.114 55.665 0 1 1-42.228 0 21.114 55.665 0 1 1 42.228 0"
        color="#000"
        opacity="1"
        transform="matrix(1.17368 .32054 -.20627 .96588 -87.616 -273.668)"
        visibility="visible"
      ></Path>
      <Path
        fill="#303038"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M523.146 335.194c-10.025 6.59-19.53 23.301-24.03 44.375-4.754 22.259-2.588 43.062 4.562 53.656.645.318 1.309.593 2 .781 12.52 3.42 27.417-15.834 33.218-43s.334-52.018-12.187-55.437a11.1 11.1 0 0 0-3.563-.375"
        color="#000"
        opacity="1"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#radialGradient3714)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M523.146 335.194c-10.025 6.59-19.53 23.301-24.03 44.375-4.754 22.259-2.588 43.062 4.562 53.656.645.318 1.309.593 2 .781 12.52 3.42 27.417-15.834 33.218-43s.334-52.018-12.187-55.437a11.1 11.1 0 0 0-3.563-.375"
        color="#000"
        opacity="1"
        visibility="visible"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#000"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M695.671 308.233s9.724 17.504 20.421 19.449c16.377 2.977 27.635-.271 33.063-3.89 8.752-5.835 15.559-28.156 17.504-54.456 1.075-14.547 2.917-33.063 0-40.842-2.918-7.78-9.725-15.56-9.725-15.56s-2.917-2.916-7.78 0c-4.861 2.918-18.475 23.34-26.255 28.201-7.78 4.863-15.559 21.394-15.559 26.256s-10.697 40.842-11.669 40.842z"
      ></Path>
      <Path
        fill="url(#radialGradient3617)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M555.614 310.997s-10.4-26.426-29.899-28.724c-19.498-2.298-31.198-5.745-37.698 1.149-6.5 6.893-11.699 20.68 9.1 18.383s49.397 3.447 58.497 9.192"
      ></Path>
      <Path
        fill="url(#radialGradient3621)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M563.188 363.8s17.177-42.204.554-68.098-24.46-43.76-37.917-43.76c-13.457-.001-32.772 9.32-10.132 31.588 22.639 22.27 44.566 62.922 47.495 80.27"
      ></Path>
      <Path
        fill="#1a1c2c"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M517.834 343.225c-1.262.07-2.536.398-3.813.938-6.364 8.497-11.812 20.919-14.906 35.406-3.565 16.694-3.245 32.57.156 43.937.005.005-.005.027 0 .032 1.212 1.042 2.547 1.79 4 2.187 10.456 2.856 22.875-13.222 27.72-35.906 4.843-22.684.298-43.426-10.157-46.281a9.4 9.4 0 0 0-3-.313"
        color="#000"
        opacity="1"
        visibility="visible"
      ></Path>
      <Path
        fill="#262932"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="2.555"
        d="M626.899 482.279a21.114 55.665 0 1 1-42.228 0 21.114 55.665 0 1 1 42.228 0"
        color="#000"
        opacity="1"
        transform="matrix(.34308 .0937 -.0603 .28234 338.396 192.627)"
        visibility="visible"
      ></Path>
      <Path
        fill="#0c0912"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="2.555"
        d="M626.899 482.279a21.114 55.665 0 1 1-42.228 0 21.114 55.665 0 1 1 42.228 0"
        color="#000"
        opacity="1"
        transform="matrix(.34308 .0937 -.0603 .28234 340.7 193.01)"
        visibility="visible"
      ></Path>
      <Path
        fill="#74849d"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#abbcd1"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="2.555"
        d="M626.899 482.279a21.114 55.665 0 1 1-42.228 0 21.114 55.665 0 1 1 42.228 0z"
        color="#000"
        opacity="1"
        transform="matrix(.18617 .05084 -.03272 .1532 423.22 281.295)"
        visibility="visible"
      ></Path>
      <Path
        fill="#192028"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="2.555"
        d="M626.899 482.279a21.114 55.665 0 1 1-42.228 0 21.114 55.665 0 1 1 42.228 0"
        color="#000"
        opacity="1"
        transform="matrix(.18617 .05084 -.03272 .1532 426.067 281.838)"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#linearGradient3651)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M516.675 430.727s12.45-5.914 20.854-29.57 3.424-29.57 3.424-29.57-1.556 21.166-3.424 24.278c-1.867 3.113-7.47 8.093-5.914 6.226 1.557-1.868 3.735-8.093 4.358-12.762s-1.245-7.16-1.245-7.16-3.424 20.855-8.093 27.703-12.139 14.63-14.63 15.563c-2.49.934-5.602.623-5.602.623s3.424 2.801 6.537 1.556 4.046-.623 4.046-.623 1.556 4.047-2.801 4.047-7.16 1.556-10.583-1.556-5.603-7.16-5.603-7.16.311 9.338 9.027 10.272 9.96-1.556 9.649-1.867"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient4266)"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="2"
        d="M512.428 440.463s24.953 7.294 37.622-54.897"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient4256)"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="2.566"
        d="M515.115 445.838s26.68 7.798 40.226-58.697"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient4351)"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="1.574"
        d="M504.141 426.093s19.638 5.74 29.608-43.202"
        opacity="0.758"
      ></Path>
      <Path
        fill="#cbe8fd"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M519.259 387.26s.575-6.142 2.303-7.293c1.728-1.152 4.223-2.304 2.687-2.496-1.535-.192-3.647-.383-3.647-.383s-3.839 3.455-3.839 4.99-1.151 4.799-1.151 4.799.575-1.536 3.647.384"
        opacity="1"
      ></Path>
      <Path
        fill="none"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="url(#linearGradient4343)"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="2.019"
        d="M508.176 430.707s20.996 6.137 31.656-46.193"
        opacity="0.758"
      ></Path>
      <Path
        fill="#cbe8fd"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M526.36 386.301s-2.303 5.95-4.414 6.334c-2.112.384-2.495.384-2.495.384s1.535 2.304 2.879 1.536c1.343-.768 4.607-5.375 4.03-8.254"
        opacity="1"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient4243)"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="1.166"
        d="M537.298 327.535s-26.68-7.8-40.226 58.697"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m513.444 375.636-3.978-25.364s1.99-4.476 7.46-5.47c5.47-.995 7.46 0 7.46 0l-2.984 24.369s-5.47-.995-7.958 6.465"
      ></Path>
      <Path
        fill="#c7eef2"
        fillOpacity="0.149"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M474.839 392.242s11.733-60.287 33.162-74.15c18.7-12.097 26.015-7.829 30.9-5.657 4.887 2.171 4.344-8.144-.542-10.858s-12.992-4.932-23.71-2.354c-3.338.803-13.75 6.697-15.38 8.869-1.628 2.171-10.858 17.373-13.572 22.802-2.715 5.429-7.058 30.403-7.058 30.403z"
      ></Path>
      <Path
        fill="url(#linearGradient4083)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m513.444 375.636-1.491-30.337s-2.958-2.664 5.47-1.99c4.92.394 6.963 1.492 6.963 1.492l-2.984 24.37s-5.47-.995-7.958 6.465"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M511.213 467.707s-20.63-7.058-29.317-22.26c-8.686-15.201-8.686-19.544-12.487-36.917-.906-4.143-2.714-41.261-3.257-36.918s-16.83 20.087-15.201 26.602-5.972 8.687-4.887 13.03-17.728 8.56-14.658 24.431c3.065 15.848 10.315 30.946 36.375 24.43 9.993-2.498 20.63 12.488 24.974 12.488 4.343 0 19.544-4.344 18.458-4.886"
        opacity="0.654"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M511.953 401.995h6.465l3.481-2.487v14.423s-6.465 8.952-8.455 9.947c-1.989.994-5.47.497-5.47.497z"
      ></Path>
      <Path
        fill="url(#linearGradient3893)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M525.864 334.124s8.446-1.92 13.82 3.071 8.446 16.892 8.446 24.954c0 8.061 0 25.72-1.92 28.024-1.919 2.303-5.758 1.152-4.606-11.9 1.152-13.053.384-29.177-3.839-35.32-3.397-4.94-6.142-8.445-11.9-8.829"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient4275)"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.5"
        d="M549.282 389.789s8.062-41.844-7.294-52.594"
      ></Path>
      <Path
        fill="url(#linearGradient4098)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M512.45 404.979h6.465l2.487-2.487.497 11.439s-4.476 6.963-8.455 9.947c-1.779 1.334-2.984-.498-2.984-.498z"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient4283)"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.46"
        d="M538.72 386.376s7.422-38.518-6.713-48.413"
      ></Path>
      <Path
        fill="url(#radialGradient3917)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="0.5"
        d="M624.212 528.538a26.297 20.922 0 1 1-52.594 0 26.297 20.922 0 1 1 52.594 0"
        opacity="0.617"
        transform="matrix(.69343 0 0 1.31193 334.647 -400.85)"
      ></Path>
      <Path
        fill="#1e2128"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="0.5"
        d="M834.993 368.13a8.687 40.718 0 1 1-17.373 0 8.687 40.718 0 1 1 17.373 0"
        opacity="0.829"
        transform="matrix(1.35272 .0502 -.095 .96724 -332.422 -125.832)"
      ></Path>
      <Path
        fill="#1e2128"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="0.5"
        d="M754.24 232.319c-6.486-.24-13.49 17.229-15.625 38.969s1.389 39.571 7.875 39.812 13.49-17.197 15.625-38.937-1.389-39.603-7.875-39.844m-1.844 5.094c5.682.21 8.777 15.833 6.907 34.875s-7.975 34.335-13.657 34.125c-5.68-.211-8.776-15.833-6.906-34.875s7.975-34.336 13.656-34.125"
        opacity="0.829"
      ></Path>
      <Path
        fill="#3f4654"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="0.5"
        d="M752.362 237.944c-.962-.036-1.947.39-2.911 1.197 3.979 3.974 5.884 17.375 4.334 33.155-1.524 15.52-5.903 28.48-10.545 32.38.75.748 1.572 1.163 2.458 1.196 5.595.208 11.615-14.823 13.457-33.576 1.842-18.752-1.198-34.144-6.793-34.352"
        opacity="0.829"
      ></Path>
      <Path
        fill="#1e2128"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="0.5"
        d="M748.69 236.975c-.86 1.316-1.697 2.9-2.5 4.688 3.245 4.06 4.73 15.562 3.407 29.03-1.378 14.03-5.394 25.735-9.594 29.032.326 1.563.7 3.003 1.125 4.281 5.297-1.457 10.737-15.8 12.47-33.437 1.617-16.469-.564-30.327-4.907-33.594"
        opacity="0.829"
      ></Path>
      <Path
        fill="#b2b7c5"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M759.594 267.373s3.257.272 2.714 4.887-3.07 27.337-11.4 35.289c-5.973 5.7-8.144-1.63-8.144-1.63s3.8 2.987 5.7-.27 10.587-14.388 11.13-38.276"
      ></Path>
      <Path
        fill="url(#linearGradient3762)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M750.093 269.274s4.615-2.986 4.072 1.628c-.543 4.615-1.122 21.964-8.958 30.403-3.53 3.8-5.158 0-5.158 0s-1.357 2.986.543-.271 8.958-7.872 9.501-31.76"
      ></Path>
      <Path
        fill="#b2b7c5"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M757.694 249.186s2.171-1.9 2.171 2.986 1.629 15.744.815 16.016-1.9-2.172-1.63-6.787c.272-4.614-1.356-12.486-1.356-12.215"
        opacity="0.738"
      ></Path>
      <Path
        fill="#b2b7c5"
        fillOpacity="0.295"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M743.85 303.748c2.443-1.9 3.528-8.686 5.7-9.5s6.515-.272 3.8 3.257-3.528 10.044-5.7 9.5c-2.172-.542-2.986-2.17-3.8-3.257"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient3742)"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M748.193 311.349s10.587-5.972 12.487-31.217 1.9-27.689 1.9-27.689"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient3746)"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M744.195 312.363s10.838-5.503 13.842-30.64c3.005-25.138 3.112-27.579 3.112-27.579"
      ></Path>
      <Path
        fill="#23262f"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="0.5"
        d="M829.211 373.253a2.687 8.83 0 1 1-5.374 0 2.687 8.83 0 1 1 5.374 0"
        opacity="1"
        transform="rotate(6.271 1723.385 -379.418)"
      ></Path>
      <Path
        fill="url(#linearGradient3780)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="0.5"
        d="M829.211 373.253a2.687 8.83 0 1 1-5.374 0 2.687 8.83 0 1 1 5.374 0"
        opacity="1"
        transform="rotate(6.271 1723.385 -379.418)"
      ></Path>
      <Path
        fill="url(#linearGradient3791)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m749.29 261.952-4.222 1.152-1.92 5.374s4.991 3.84 4.991 1.92 1.536-8.062 1.152-8.446"
      ></Path>
      <Path
        fill="#e0e2e8"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m747.371 245.06 2.687 15.357s4.607-8.062-2.687-15.356"
        opacity="0.15"
      ></Path>
      <Path
        fill="#e0e2e8"
        fillOpacity="0.112"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M738.158 272.701c.15-9.747 3.07-37.621 14.588-40.692 11.517-3.072 11.133 23.8 11.133 23.8s1.151-16.506-.384-21.881-1.92-9.213-6.526-11.9c-3.648-2.128-6.812.528-10.366 5.374-4.222 5.758-10.703 27.926-11.516 43.38-.768 14.588-1.536 30.327 2.303 37.238s9.981 9.597 13.436 8.061 8.062-13.052 8.83-15.74c.768-2.687-4.607 15.356-9.214 12.67-4.606-2.688-12.902-.15-12.284-40.31"
      ></Path>
      <Path
        fill="#e0e2e8"
        fillOpacity="0.328"
        fillRule="evenodd"
        stroke="#000"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M744.3 229.321s7.678-10.365 11.133-8.062 8.83 10.75 8.83 10.75-.384-4.607-3.84-13.053c-3.668-8.968-11.132-5.374-13.052-3.455-1.92 1.92-3.071 13.82-3.071 13.82z"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient3738)"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M754.602 231.134s-10.34 4.075-14.856 28.985c-4.044 22.311.013 27.352.013 27.352"
      ></Path>
      <Path
        fill="url(#linearGradient4109)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m525.38 371.657 6.466-10.941s.995 18.899-.497 23.375-2.487.497-2.487.497.497-9.947-3.481-12.93"
      ></Path>
      <Path
        fill="#5d5d5d"
        fillOpacity="0.162"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M469.516 412.593s0 43.607 18.287 56.97c18.287 13.364 40.793-6.33 40.793-6.33s16.88-15.473 20.397-28.837-10.55 21.1-28.837 21.1-32.353-29.54-35.167-41.496-13.363-19.694-15.473-1.407"
      ></Path>
      <Path
        fill="url(#linearGradient4123)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M509.963 381.604h-10.941s-2.984 22.38-1.492 31.332c6.465-5.968 12.433-11.438 12.433-11.438s-3.481-12.931 0-19.894"
      ></Path>
      <Path
        fill="url(#linearGradient4279)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M496.243 402.043s7.204-24.034 17.05-28.958 15.303-9.023 17.414 2.23c2.11 11.254 11.253-10.55 9.846-14.066-1.406-3.517-4.22-21.803-11.253-23.913s-11.064-.306-17.584 11.253c-18.97 33.634-14.066 42.904-15.473 53.454"
        opacity="1"
      ></Path>
      <Path
        fill="#161616"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M469.679 422.883s0-38.792 5.968-58.686 12.93-44.76 21.883-51.723c8.952-6.962 21.883-8.952 15.914-13.925s-13.925-14.92-25.86-2.984c-11.937 11.936-23.873 40.782-26.857 58.686s-2.984 60.675-2.984 60.675 0 19.893 11.936 7.957"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient4377)"
        strokeDasharray="2.9, 2.9"
        strokeLinecap="butt"
        strokeWidth="2.9"
        d="M509.022 474.286s-24.726 1.337-38.76-26.062-9.355-65.49-9.355-65.49"
        opacity="0.067"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient4381)"
        strokeDasharray="2.9, 2.9"
        strokeLinecap="butt"
        strokeWidth="2.9"
        d="M494.989 474.955s-24.726 1.336-38.76-26.063-9.356-65.49-9.356-65.49"
        opacity="0.067"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient4385)"
        strokeDasharray="2.9, 2.9"
        strokeLinecap="butt"
        strokeWidth="2.9"
        d="M484.296 474.955s-24.726 1.336-38.76-26.063-9.355-65.49-9.355-65.49"
        opacity="0.067"
      ></Path>
    </G>
    <G strokeLinejoin="miter" strokeOpacity="1" opacity="1">
      <Path
        fill="#ffbe00"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M547.334 87.913c-41.429 0-84.643 5.71-90 6.78-5.357 1.072-10.01 5-11.438 5s-4.28 1.416-6.78 2.845c-2.5 1.428-4.3 5.375-7.157 7.875s-47.844 50.343-47.844 50.343l-3.937 1.438S285.9 173.97 229.115 188.256s-90.361 36.433-110.719 48.22c-20.357 11.785-7.852 9.29-16.78 15.718-8.93 6.428-21.43 29.277-25 38.562-3.572 9.286-5 30.375-5 32.875s1.78 12.5 1.78 12.5-1.78 2.853-1.78 6.782 6.437 5 6.437 5c.714.357 4.272 18.205 42.843 41.062s121.782 39.281 121.782 39.281 49.28 8.224 66.78 8.938 90.938-8.969 90.938-8.969 26.21 2.183 42.282-18.531 21.223-26.647 36.937-70.219 31.897-52.803 37.969-56.375c6.071-3.571 30.303-14.022 43.875-2.594s13.714 20.97 18 35.97 6.13 50.297 1.812 55.374c-6.387 7.513-21.08 12.487-18.937 12.844s9.281-1.438 9.281-1.438l15.719-9.28s81.062-47.51 108.562-63.938 34.657-25.344 34.657-25.344l-1.094-3.938s.719-5.714 3.219-12.5 9.052-31.616 13.593-45.718c4.56-14.16 6.224-19.567 11.938-22.782s10.559 9.991 10.937 17.344c.837 16.256-1.812 30.813-1.812 30.813l1.062-1.782 5.375-8.937s3.732-8.923 6.688-16.938l-.094-.03c4.771-13.58 3.789-26.439 2.688-32.188-1.072-5.598-3.466-9.04-12.282-17.907-.01-.003-.021.004-.03 0-1.738-.674-2.404-1.707-7.688-5.437-6.072-4.286-21.094-8.567-26.094-9.281s-5.688-.375-5.688-.375l-1.437-3.907s-22.491-42.513-56.063-52.156c-33.571-9.643-85.009-11.062-126.437-11.062"
      ></Path>
      <G
        fill="#e1eee5"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        transform="translate(-78.385 -99.4)"
      >
        <Path d="m504.086 258.33 48.527-4.952 26.244-41.594-44.07-2.476z"></Path>
        <Path d="m498.639 259.876 31.691-52.549-50.713 54.844z"></Path>
        <Path d="M615.005 203.366s13.864 13.865 26.244 19.311c12.38 5.447 29.215 12.38 35.157 12.38 8.913 0 37.633-1.486 37.633-1.486l-1.485-19.311s-1.486-2.971-12.875-3.962c-9.386-.816-52.983-4.952-52.983-4.952z"></Path>
      </G>
      <Path
        fill="#2b3545"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m440.873 107.23-45.163 50.074-11.91 6.648s.722 2.627 8.075 2.89c2.964.106 9.268-.57 13.648-1.416 6.485-1.252 12.24-4.975 12.24-4.975l-18.18 2.408 45.491-55.98z"
      ></Path>
      <G
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        transform="translate(-78.385 -99.4)"
      >
        <Path
          fill="url(#linearGradient3586)"
          d="m479.945 260.476 72.668-7.098 26.244-41.594-58.555-4.086z"
        ></Path>
        <Path
          fill="url(#linearGradient3588)"
          d="m498.639 259.876 31.691-52.549-50.713 54.844z"
        ></Path>
        <Path
          fill="url(#linearGradient3584)"
          d="M615.005 203.366s13.864 13.865 26.244 19.311c12.38 5.447 29.215 12.38 35.157 12.38 8.913 0 37.633-1.486 37.633-1.486l-1.485-19.311s-1.486-2.971-12.875-3.962c-9.386-.816-52.983-4.952-52.983-4.952z"
        ></Path>
      </G>
      <Path
        fill="#152032"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m390.103 166.403 86.134-9.103 23.11-43.418-45.519-4.201-15.406-3.502s13.305-3.501 17.507-3.501 75.63.7 78.431.7 6.303 4.902 9.804 8.403 25.91 14.706 30.112 16.807 24.51 7.003 24.51 7.003l37.815-1.4 6.303 41.316s-32.213 4.202-52.521 3.501c-20.309-.7-121.149-7.002-133.054-7.002-11.904 0-67.226-4.202-67.226-5.603"
      ></Path>
      <G
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        strokeLinecap="butt"
        opacity="1"
        transform="translate(-139.557 33.886)"
      >
        <Path
          stroke="#614d19"
          strokeDasharray="none"
          strokeWidth="5.3"
          d="M675.557 139.926s9.323-24.105 39.387-21.1c25.602 2.56 35.167 24.265 35.167 24.265"
        ></Path>
        <Path
          stroke="url(#linearGradient4515)"
          strokeDasharray="none"
          strokeWidth="5.3"
          d="M675.557 139.926s9.323-24.105 39.387-21.1c25.602 2.56 35.167 24.265 35.167 24.265"
        ></Path>
        <Path
          stroke="url(#radialGradient4517)"
          strokeDasharray="none"
          strokeWidth="5.3"
          d="M675.557 139.926s9.323-24.105 39.387-21.1c25.602 2.56 35.167 24.265 35.167 24.265"
        ></Path>
        <Path
          stroke="url(#radialGradient4519)"
          strokeDasharray="none"
          strokeWidth="5.3"
          d="M675.557 139.926s9.323-24.105 39.387-21.1c25.602 2.56 35.167 24.265 35.167 24.265"
        ></Path>
        <Path
          stroke="url(#radialGradient4521)"
          strokeDasharray="none"
          strokeWidth="5.3"
          d="M675.557 139.926s9.323-24.105 39.387-21.1c25.602 2.56 35.167 24.265 35.167 24.265"
        ></Path>
        <Path
          stroke="url(#linearGradient4523)"
          strokeWidth="1"
          d="M674.884 140.08s10.747-19.599 27.354-21.136c13.428-1.244 21.634 0 31.83 6.216s16.66 17.407 16.66 17.407"
        ></Path>
      </G>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient3169)"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="1.9"
        d="M182.33 251.123s-3.93 6.072-2.858 8.572-.714 5 11.786 7.857c18.03 4.121 51.786 7.5 65 10s48.929 7.143 65.357 2.857c16.429-4.286 37.143-14.643 67.5-29.643s79.643-33.571 102.857-40.357c23.215-6.786 48.572-15 50.715-15.714 2.142-.715 5.357-1.786 2.857-3.572s-10.715-2.857-10.715-2.857"
        opacity="0.542"
      ></Path>
      <Path
        fill="#e9f0f1"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="url(#linearGradient3467)"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1.7"
        d="M476.053 97.319c-4.925 0-28.393.744-29.782 1.375s-6.707 2.932-7.843 3.437c-.481.214-1.331 2.122-2.157 4.25.047-.03.139-.075.157-.093.714-.715 5.196-2.474 6.625-3.188 1.428-.714 11.78-1.259 15.53-1.437s41.974-.366 76.438 1.062c34.465 1.429 85.884 7.143 93.563 8.75 7.678 1.607 12.312 4.643 14.812 12.5s4.657 41.603 4.657 43.031c0 1.429-1.625 3.21-4.125 5.532s-6.072 2.696-36.25 4.125-86.42-1.255-148.563-4.47c-62.143-3.213-70.357-5.704-75-7.312-4.643-1.607-2.5-3.03-2.5-3.03.008.003.042-.047.063-.063-1.186.045-2.064.062-2.094.062-.631 1.01-1.624 1.894-1.75 3.156s.986 3.4 2.375 4.032c1.389.631 12.132 3.026 17.687 3.53 5.556.506 78.535 6.713 103.032 7.345 24.496.631 89.91 1.376 98.75 1.25 8.838-.127 37.498-.771 40.78-1.782 3.284-1.01 9.338-3.022 9.97-7.062.63-4.04.19-25.604-3.282-47.469-3.221-20.29-34.837-19.785-50-21.719-9.032-1.151-57.964-4.686-64.656-4.812s-51.513-1-56.437-1z"
      ></Path>
      <Path
        fill="#03222f"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M649.846 108.595s10.379-.774 15.435-.258 18.896 1.548 22.621 2.322c3.726.774 6.121 1.29 7.718 3.096 5.063 3.539-2.538.61-.087 3.49 3.298 8.634 15.764 50.17 15.764 50.17s-21.266 4.387-29.782 6.192-22.62 4.902-22.62 4.902-3.194.516-3.46-3.612c-.267-4.127-4.525-42.825-5.59-48.5-1.064-5.677-3.459-12.384-3.193-14.19s2.928-3.612 3.194-3.612"
      ></Path>
      <Path
        fill="#213447"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m633.1 113.532 8.403 61.275s8.403-8.404 7.703-11.205c-.7-2.8-5.207-40.151-7.003-42.717-2.45-3.501-5.602-6.653-9.103-7.353"
      ></Path>
      <Path
        fill="#d4f0fc"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M649.683 110.071s9.849-.757 14.647-.252 17.93 1.515 21.466 2.273c3.535.757 5.808 1.262 7.323 3.03s2.525 2.778 5.556 12.627c3.03 9.849 12.374 39.901 12.374 39.901s-23.233 4.293-31.314 6.061c-8.082 1.768-21.466 4.798-21.466 4.798s-3.03.505-3.283-3.535-4.293-41.922-5.303-47.477c-1.01-5.556-3.283-12.122-3.03-13.89.252-1.768 2.777-3.536 3.03-3.536"
      ></Path>
      <Path
        fill="url(#linearGradient3662)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M649.683 110.071s9.849-.757 14.647-.252 17.93 1.515 21.466 2.273c3.535.757 5.808 1.262 7.323 3.03s2.525 2.778 5.556 12.627c3.03 9.849 12.374 39.901 12.374 39.901s-23.233 4.293-31.314 6.061c-8.082 1.768-21.466 4.798-21.466 4.798s-3.03.505-3.283-3.535-4.293-41.922-5.303-47.477c-1.01-5.556-3.283-12.122-3.03-13.89.252-1.768 2.777-3.536 3.03-3.536"
      ></Path>
      <Path
        fill="#042b3d"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M655.49 112.344s29.295 1.01 32.578 2.273 3.788.758 5.051 3.283 14.395 49.245 14.395 49.245l-36.618 8.081z"
      ></Path>
      <Path
        fill="#d1e3ec"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M656.501 114.365s16.415.505 22.476 1.262c6.06.758 10.102.758 11.617 2.526s5.303 17.677 5.303 17.677l8.586 32.325-33.082 6.566z"
      ></Path>
      <Path
        fill="#def3fd"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="url(#linearGradient3499)"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1.6"
        d="m649.683 118.405 2.525-2.273 1.01-.505 13.89 56.064-10.86 1.767-6.06-48.74z"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient3275)"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1.7"
        d="M658.044 178.98s-8.572 3.929-10.715 5.357c-2.142 1.43-5 4.286-5.357 6.786s3.572 12.5 7.857 19.643 7.5 17.857 7.858 21.071 3.214 35.715 1.428 47.5c-1.786 11.786-7.143 46.43-7.143 46.43"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient3753)"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M712.687 169.695s17.142 9.285 20.357 15.714c3.214 6.428 7.5 12.857 7.5 20.714 0 6.429-11.746 49.881-13.215 54.286-2.5 7.5-5.714 18.571-10 23.214s-16.071 13.572-20.714 16.072l-4.643 2.5"
      ></Path>
      <Path
        fill="url(#linearGradient3111)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M469.276 312.929s14.798-9.399 38.105-21.996c5.839-3.157 6.493-7.011 13.302-10.471 3.317-1.686 12.457-2.9 15.97-4.623 24.536-12.04 53.555-24.728 83.156-34.215 77.247-24.759 112.9-34.662 117.85-35.652 4.953-.99 9.122-9.145 18.843-12.076 7.586-2.286 6.391-1.914 11.135-7.532 4.99-5.91 3.695-15.055 3.695-15.055.48-1.439-18.432-17.99-43.576-15.845-23.764 2.027 10.894 2.97 19.807 12.874 4.863 5.404-6.699 16.341-15.073 15.796-6.974-.455-14.87-14.046-19.37-14.946-9.904-1.981-17.055 2.121-24.977 3.112-7.923.99-17.827 9.903-33.672 21.787-15.846 11.885-86.16 27.73-123.793 50.508s-58.43 69.324-61.402 68.334"
      ></Path>
      <Path
        fill="url(#linearGradient3103)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M767.365 167.881v17.282s-14.849 8.925-21.781 10.906c-6.933 1.98-15.849 11.882-22.781 15.844-6.933 3.961-87.154 20.813-144.594 46.562a2169 2169 0 0 0-37.125 17.063c7.258-.748 14.733.218 20.375 4.968 13.571 11.429 13.714 20.97 18 35.97s6.13 50.297 1.812 55.374c-6.387 7.513-21.08 12.487-18.937 12.844s9.281-1.438 9.281-1.438l15.719-9.28s81.062-47.51 108.562-63.938 34.657-25.344 34.657-25.344l-1.094-3.938s.719-5.714 3.219-12.5 9.052-31.616 13.593-45.718c4.56-14.16 6.224-19.567 11.938-22.782s10.559 9.991 10.937 17.344c.837 16.256-1.812 30.813-1.812 30.813l1.062-1.782 5.375-8.937s3.737-8.922 6.688-16.938l-.094-.03c4.771-13.58 3.789-26.439 2.688-32.188-1.074-5.605-3.47-9.046-12.313-17.938-1.078-.436-1.846-1.035-3.375-2.219M505.21 292.944c-13.668 6.86-23.303 11.963-29 15.031-12.875 6.933-19.799 6.938-37.625 19.813s-36.653 39.616-68.344 51.5c-42.88 8.65-50.132 7.971-107.781 1.812-88.735-9.48-172.33-37.027-189.281-46.25l.218 1.281s-1.78 2.853-1.78 6.782 6.437 5 6.437 5c.714.357 4.272 18.205 42.843 41.062s121.782 39.281 121.782 39.281 49.28 8.224 66.78 8.938 90.938-8.969 90.938-8.969 26.21 2.183 42.282-18.531 21.223-26.647 36.937-70.219c9.045-25.078 18.258-38.733 25.594-46.531"
      ></Path>
      <Path
        fill="url(#linearGradient3151)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M77.077 324.667s-2.8 8.403 7.703 14.005c10.505 5.602 98.74 36.415 136.555 36.415s8.403-38.516 14.706-60.224c6.302-21.709 11.204-76.33 55.322-80.533 44.118-4.201 152.661-13.305 155.462-14.005s74.23-17.507 81.933-22.41c7.703-4.901 18.908-9.103-24.51-11.904-43.417-2.801-90.336-4.202-101.54-7.703s-18.908 4.202-22.41-4.202c-3.5-8.403-2.1-10.504-9.103-10.504s-49.72 7.703-87.535 14.006c-37.815 6.302-85.434 19.608-112.745 30.812s-53.922 30.112-53.922 30.112 9.104-6.302 18.208-.7 14.705 15.406 12.605 20.308c-2.101 4.902-17.507 26.61-24.51 32.213-7.003 5.602-34.314 32.213-38.516 32.913s-5.602 1.4-7.703 1.4"
        opacity="0.608"
      ></Path>
      <Path
        fill="url(#radialGradient3133)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M122.966 236.49s11.262 1.458 16.164 5.66c4.902 4.201 5.816 13.091 5.816 17.293 0 4.201-6.244 14.103-6.244 14.103l-7.003 11.205s19.608-16.107 34.314-27.311 56.723-35.715 71.428-43.418c14.706-7.703 76.331-28.711 84.734-30.812 8.404-2.1 24.51-4.202 21.009-8.403s-21.009 0-36.415 1.4c-7.112.647-84.734 16.107-106.442 23.11-21.71 7.002-68.958 31.57-77.361 37.172"
      ></Path>
      <Path
        fill="url(#linearGradient3161)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M507.834 188.725c-1.612-.006-4.935.218-11.063 1.531-9.804 2.101-31.727 8.356-41.53 11.157-9.805 2.8-67.947 19.623-93.157 23.125S234.634 240.3 204.52 255.006s-38.5 31.85-53.906 33.25c-15.406 1.401-19.605-4.22-22.406-.718S85.467 332.38 79.865 332.38c0 0 37.124 20.31 71.438 27.313 29.632 6.047 99.989 22.674 123.156 23.5.128.256.28.487.531.687 4.22 3.377 39.679 1.688 63.031.844 22.288-.805 16.078 2.752 48.688-13.531-15.258 6.083-54.667 12.125-68.938 12.125-14.626 0-23.175-4.456-30.968-12.281 2.567-10.227 4.095-24.21 8.75-31.657 7.002-11.204 16.096-22.241 24.5-27.843s67.946-52.685 77.75-59.688 65.139-28.016 91.75-35.719c26.61-7.703 43.414-10.517 53.218-14.718s20.299-9.088 9.094-7.688-81.922 22.406-89.625 22.406-35.736 9.783-39.937 6.282c-4.202-3.502 20.332-13.28 32.937-16.782 12.605-3.501 53.906-16.812 53.906-16.812s-.345-.09-1.312-.094M386.709 371.194c1.889-.753 3.446-1.475 4.5-2.219-1.745.873-2.942 1.44-4.5 2.219"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient3179)"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="0.8"
        d="M182.825 251.123s-3.929 5.081-2.858 7.581c1.072 2.5-.714 5 11.786 7.857 18.03 4.122 51.786 7.5 65 10s48.929 7.143 65.357 2.858c16.429-4.286 37.143-14.643 67.5-29.643s79.643-33.572 102.857-40.357c23.215-6.786 48.572-15 50.715-15.715s5.357-1.785 2.857-3.571-10.714-2.857-10.714-2.857"
      ></Path>
      <Path
        fill="url(#linearGradient3197)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M85.343 330.501s-2.801-.348 7.703 5.254 90.474 39.332 128.289 39.332 8.403-38.516 14.706-60.224c6.302-21.709 11.204-76.33 55.322-80.533 44.118-4.201 152.661-13.305 155.462-14.005s74.23-17.507 81.933-22.41c7.703-4.901 18.908-9.103-24.51-11.904-43.417-2.801-90.336-4.202-101.54-7.703s-18.908 4.202-22.41-4.202c-3.5-8.403-2.1-10.504-9.103-10.504s-49.72 7.703-87.535 14.006c-37.815 6.302-85.434 19.608-112.745 30.812s-53.922 30.112-53.922 30.112 9.104-6.302 18.208-.7 23.944 7.14 21.843 12.042-26.745 34.877-33.748 40.479-34.314 32.213-38.516 32.913 2.664 7.235.563 7.235"
      ></Path>
      <Path
        fill="url(#linearGradient3207)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m767.365 167.881 5.094 4.22c0 9.449-6.617 20.609-15.406 22.25-6.453 1.203-12.543 6.29-14.938 9.812-4.054 5.961-11.8 3.658-19.312 6.366s-87.154 22.197-144.594 47.946a2169 2169 0 0 0-37.125 17.063c7.258-.748 14.733.218 20.375 4.968 13.571 11.429 13.714 20.97 18 35.97s6.13 50.297 1.812 55.374c-6.387 7.513-21.08 12.487-18.937 12.844s9.281-1.438 9.281-1.438l15.719-9.28s81.062-47.51 108.562-63.938 34.657-25.344 34.657-25.344l-1.094-3.938s.719-5.714 3.219-12.5 9.052-31.616 13.593-45.718c4.56-14.16 6.224-19.567 11.938-22.782s10.559 9.991 10.937 17.344c.837 16.256-1.812 30.813-1.812 30.813l1.062-1.782 5.375-8.937s3.737-8.922 6.688-16.938l-.094-.03c4.771-13.58 3.789-26.439 2.688-32.188-1.074-5.605-3.47-9.046-12.313-17.938-1.078-.436-1.846-1.035-3.375-2.219M505.21 292.944c-13.668 6.86-23.303 11.963-29 15.031-12.875 6.933-19.799 6.938-37.625 19.813s-36.653 39.616-68.344 51.5c-42.88 8.65-50.132 7.971-107.781 1.812-88.735-9.48-172.33-37.027-189.281-46.25l.218 1.281s-1.78 2.853-1.78 6.782 6.437 5 6.437 5c.714.357 4.272 18.205 42.843 41.062s121.782 39.281 121.782 39.281 49.28 8.224 66.78 8.938 90.938-8.969 90.938-8.969 26.21 2.183 42.282-18.531 21.223-26.647 36.937-70.219c9.045-25.078 18.258-38.733 25.594-46.531"
      ></Path>
      <Path
        fill="url(#linearGradient3211)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M767.365 167.881v17.282s-12.974 12.894-19.906 14.875c-6.933 1.98-17.724 6.183-24.656 10.145-6.933 3.961-87.154 22.543-144.594 48.292a2169 2169 0 0 0-37.125 17.063c7.258-.748 14.733.218 20.375 4.968 13.571 11.429 13.714 20.97 18 35.97s6.13 50.297 1.812 55.374c-6.387 7.513-21.08 12.487-18.937 12.844s9.281-1.438 9.281-1.438l15.719-9.28s81.062-47.51 108.562-63.938 34.657-25.344 34.657-25.344l-1.094-3.938s.719-5.714 3.219-12.5 9.052-31.616 13.593-45.718c4.56-14.16 6.224-19.567 11.938-22.782s10.559 9.991 10.937 17.344c.837 16.256-1.812 30.813-1.812 30.813l1.062-1.782 5.375-8.937s3.737-8.922 6.688-16.938l-.094-.03c4.771-13.58 3.789-26.439 2.688-32.188-1.074-5.605-3.47-9.046-12.313-17.938-1.078-.436-1.846-1.035-3.375-2.219M505.21 292.944c-13.668 6.86-23.303 11.963-29 15.031-12.875 6.933-19.799 6.938-37.625 19.813s-36.653 39.616-68.344 51.5c-42.88 8.65-50.132 7.971-107.781 1.812-76.817-8.207-149.788-29.948-179-41.625-3.048-1.218-5.176-8.432-6.938-13.437-.516 2.242-1.187 4.25-1.187 4.25s-3.719 8.696-3.719 12.625c0 3.928 6.438 5 6.438 5 .714.357 4.272 18.205 42.843 41.062s121.782 39.281 121.782 39.281 49.28 8.224 66.78 8.938 90.938-8.969 90.938-8.969 26.21 2.183 42.282-18.531 21.223-26.647 36.937-70.219c9.045-25.078 18.258-38.733 25.594-46.531M76.52 326.038c.848-3.685 1.28-7.976-2.375-4.813.746.406 1.517 2.375 2.375 4.813"
      ></Path>
      <Path
        fill="url(#radialGradient3261)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M614.688 200.252c-29.21.14-79.851 8.872-112.594 18.125-37.686 10.65-95.08 41.332-114 51.719 5.327.513 10.699 2.457 15.75 6.687 17.823 14.927 19.15 40.284 16.437 53.157.907-1.433-13.856 27.055-13.043 25.428 6.933-13.865 76.206-42.522 93.566-58.997 5.728-5.435 19.894-18.53 40.761-22.202 49.052-8.63 101.45-62.016 95.216-69.636-2.507-3.064-10.664-4.336-22.093-4.28"
      ></Path>
      <Path
        fill="url(#linearGradient3459)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeLinecap="round"
        strokeWidth="1.7"
        d="M712.074 127.982c-26.95-25.55-40.584-26.768-81.86-27.652-5.747-.123-20.75-2.143-29.222-2.638-53.026-3.1-146.624-.996-140.297-2.391 11.86-2.616 38.656-7.327 91.77-7.838 52.401-.505 91.483 3.512 119.899 10.84 17.785 4.587 40.41 28.196 39.71 29.679"
        opacity="1"
      ></Path>
      <G
        fillRule="evenodd"
        strokeLinecap="butt"
        transform="translate(-34.075 -38.561)"
      >
        <G>
          <G transform="translate(-43.959 -60.487)">
            <Path
              fill="#80989b"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1"
              d="m585.53 212.722 19.341-1.055s4.093-.342 4.572 4.923c.352 3.869-.703 7.385-.703 7.385l-26.375-.351s-2.11-2.814-1.055-5.627 3.868-5.275 4.22-5.275"
            ></Path>
            <Path
              fill="#ccdbed"
              fillOpacity="0.726"
              stroke="none"
              strokeWidth="1"
              d="M583.068 221.162c1.407.352 20.397.352 21.803.352s2.11-1.055 2.11-2.462-1.406-4.923-3.868-5.627-17.232-.351-17.232-.351-2.813 2.11-3.165 3.868.352 4.22.352 4.22"
            ></Path>
            <Path
              fill="url(#linearGradient3501)"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1"
              d="m585.53 212.722 19.341-1.055s4.093-.342 4.572 4.923c.352 3.869-.703 7.385-.703 7.385l-26.375-.351s-2.11-2.814-1.055-5.627 3.868-5.275 4.22-5.275"
            ></Path>
            <Path
              fill="url(#linearGradient3505)"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1"
              d="M583.068 221.162c1.407.352 20.397.352 21.803.352s2.11-1.055 2.11-2.462-1.406-4.923-3.868-5.627-17.232-.351-17.232-.351-2.813 2.11-3.165 3.868.352 4.22.352 4.22"
            ></Path>
            <Path
              fill="url(#linearGradient3507)"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1"
              d="m585.53 212.722 19.341-1.055s4.093-.342 4.572 4.923c.352 3.869-.703 7.385-.703 7.385l-26.375-.351s-2.11-2.814-1.055-5.627 3.868-5.275 4.22-5.275"
            ></Path>
            <Path
              fill="none"
              fillOpacity="0.75"
              stroke="#1f3157"
              strokeDasharray="none"
              strokeWidth="1.6"
              d="M592.563 208.502s-2.462 2.813-.703 4.923c1.758 2.11 5.978 1.407 5.978 1.407"
            ></Path>
            <Path
              fill="none"
              fillOpacity="0.75"
              stroke="url(#radialGradient3509)"
              strokeDasharray="none"
              strokeWidth="1.6"
              d="M592.563 208.502s-2.462 2.813-.703 4.923c1.758 2.11 5.978 1.407 5.978 1.407"
            ></Path>
            <Path
              fill="none"
              fillOpacity="0.75"
              stroke="url(#radialGradient3511)"
              strokeDasharray="none"
              strokeWidth="1.6"
              d="M592.563 208.502s-2.462 2.813-.703 4.923c1.758 2.11 5.978 1.407 5.978 1.407"
            ></Path>
          </G>
          <Path
            fill="url(#linearGradient3513)"
            fillOpacity="1"
            stroke="none"
            strokeWidth="1"
            d="m539.11 160.323 23.21.352 2.461 3.165s-5.627-1.055-8.44-1.407c-2.813-.351-15.825.704-15.825.704s-4.924.351-1.407-2.814"
          ></Path>
        </G>
        <G opacity="0.871">
          <G transform="translate(-43.959 -60.487)">
            <Path
              fill="#80989b"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1"
              d="m585.53 212.722 19.341-1.055s4.093-.342 4.572 4.923c.352 3.869-.703 7.385-.703 7.385l-26.375-.351s-2.11-2.814-1.055-5.627 3.868-5.275 4.22-5.275"
            ></Path>
            <Path
              fill="#ccdbed"
              fillOpacity="0.726"
              stroke="none"
              strokeWidth="1"
              d="M583.068 221.162c1.407.352 20.397.352 21.803.352s2.11-1.055 2.11-2.462-1.406-4.923-3.868-5.627-17.232-.351-17.232-.351-2.813 2.11-3.165 3.868.352 4.22.352 4.22"
            ></Path>
            <Path
              fill="url(#linearGradient4823)"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1"
              d="m585.53 212.722 19.341-1.055s4.093-.342 4.572 4.923c.352 3.869-.703 7.385-.703 7.385l-26.375-.351s-2.11-2.814-1.055-5.627 3.868-5.275 4.22-5.275"
            ></Path>
            <Path
              fill="url(#linearGradient4825)"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1"
              d="M583.068 221.162c1.407.352 20.397.352 21.803.352s2.11-1.055 2.11-2.462-1.406-4.923-3.868-5.627-17.232-.351-17.232-.351-2.813 2.11-3.165 3.868.352 4.22.352 4.22"
            ></Path>
            <Path
              fill="url(#linearGradient4827)"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1"
              d="m585.53 212.722 19.341-1.055s4.093-.342 4.572 4.923c.352 3.869-.703 7.385-.703 7.385l-26.375-.351s-2.11-2.814-1.055-5.627 3.868-5.275 4.22-5.275"
            ></Path>
            <Path
              fill="none"
              fillOpacity="0.75"
              stroke="#1f3157"
              strokeDasharray="none"
              strokeWidth="1.6"
              d="M592.563 208.502s-2.462 2.813-.703 4.923c1.758 2.11 5.978 1.407 5.978 1.407"
            ></Path>
            <Path
              fill="none"
              fillOpacity="0.75"
              stroke="url(#radialGradient4829)"
              strokeDasharray="none"
              strokeWidth="1.6"
              d="M592.563 208.502s-2.462 2.813-.703 4.923c1.758 2.11 5.978 1.407 5.978 1.407"
            ></Path>
            <Path
              fill="none"
              fillOpacity="0.75"
              stroke="url(#radialGradient4831)"
              strokeDasharray="none"
              strokeWidth="1.6"
              d="M592.563 208.502s-2.462 2.813-.703 4.923c1.758 2.11 5.978 1.407 5.978 1.407"
            ></Path>
          </G>
          <Path
            fill="url(#linearGradient4833)"
            fillOpacity="1"
            stroke="none"
            strokeWidth="1"
            d="m539.11 160.323 23.21.352 2.461 3.165s-5.627-1.055-8.44-1.407c-2.813-.351-15.825.704-15.825.704s-4.924.351-1.407-2.814"
          ></Path>
        </G>
      </G>
      <Path
        fill="url(#linearGradient3477)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1.7"
        d="M476.053 97.319c-4.925 0-28.393.744-29.782 1.375s-6.707 2.932-7.843 3.437c-.481.214-1.331 2.122-2.157 4.25.047-.03.139-.075.157-.093.714-.715 5.196-2.474 6.625-3.188 1.428-.714 11.78-1.259 15.53-1.437s41.974-.366 76.438 1.062c34.465 1.429 85.884 7.143 93.563 8.75 7.678 1.607 12.312 4.643 14.812 12.5s4.657 41.603 4.657 43.031c0 1.429-1.625 3.21-4.125 5.532s-6.072 2.696-36.25 4.125-86.42-1.255-148.563-4.47c-62.143-3.213-70.357-5.704-75-7.312-4.643-1.607-2.5-3.03-2.5-3.03.008.003.042-.047.063-.063-1.186.045-2.064.062-2.094.062-.631 1.01-1.624 1.894-1.75 3.156s.986 3.4 2.375 4.032c1.389.631 12.132 3.026 17.687 3.53 5.556.506 78.535 6.713 103.032 7.345 24.496.631 89.91 1.376 98.75 1.25 8.838-.127 37.498-.771 40.78-1.782 3.284-1.01 9.338-3.022 9.97-7.062.63-4.04.19-25.604-3.282-47.469-3.221-20.29-34.837-19.785-50-21.719-9.032-1.151-57.964-4.686-64.656-4.812s-51.513-1-56.437-1"
      ></Path>
      <Path
        fill="url(#linearGradient3481)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1.7"
        d="M476.053 97.319c-4.925 0-28.393.744-29.782 1.375s-6.707 2.932-7.843 3.437c-.481.214-1.331 2.122-2.157 4.25.047-.03.139-.075.157-.093.714-.715 5.196-2.474 6.625-3.188 1.428-.714 11.78-1.259 15.53-1.437s41.974-.366 76.438 1.062c34.465 1.429 85.884 7.143 93.563 8.75 7.678 1.607 12.312 4.643 14.812 12.5s4.657 41.603 4.657 43.031c0 1.429-1.625 3.21-4.125 5.532s-6.072 2.696-36.25 4.125-86.42-1.255-148.563-4.47c-62.143-3.213-70.357-5.704-75-7.312-4.643-1.607-2.5-3.03-2.5-3.03.008.003.042-.047.063-.063-1.186.045-2.064.062-2.094.062-.631 1.01-1.624 1.894-1.75 3.156s.986 3.4 2.375 4.032c1.389.631 12.132 3.026 17.687 3.53 5.556.506 78.535 6.713 103.032 7.345 24.496.631 89.91 1.376 98.75 1.25 8.838-.127 37.498-.771 40.78-1.782 3.284-1.01 9.338-3.022 9.97-7.062.63-4.04.19-25.604-3.282-47.469-3.221-20.29-34.837-19.785-50-21.719-9.032-1.151-57.964-4.686-64.656-4.812s-51.513-1-56.437-1"
      ></Path>
      <Path
        fill="url(#linearGradient3485)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1.7"
        d="M476.053 97.319c-4.925 0-28.393.744-29.782 1.375s-6.707 2.932-7.843 3.437c-.481.214-1.331 2.122-2.157 4.25.047-.03.139-.075.157-.093.714-.715 5.196-2.474 6.625-3.188 1.428-.714 11.78-1.259 15.53-1.437s41.974-.366 76.438 1.062c34.465 1.429 85.884 7.143 93.563 8.75 7.678 1.607 12.312 4.643 14.812 12.5s4.657 41.603 4.657 43.031c0 1.429-1.625 3.21-4.125 5.532s-6.072 2.696-36.25 4.125-86.42-1.255-148.563-4.47c-62.143-3.213-70.357-5.704-75-7.312-4.643-1.607-2.5-3.03-2.5-3.03.008.003.042-.047.063-.063-1.186.045-2.064.062-2.094.062-.631 1.01-1.624 1.894-1.75 3.156s.986 3.4 2.375 4.032c1.389.631 12.132 3.026 17.687 3.53 5.556.506 78.535 6.713 103.032 7.345 24.496.631 89.91 1.376 98.75 1.25 8.838-.127 37.498-.771 40.78-1.782 3.284-1.01 9.338-3.022 9.97-7.062.63-4.04.19-25.604-3.282-47.469-3.221-20.29-34.837-19.785-50-21.719-9.032-1.151-57.964-4.686-64.656-4.812s-51.513-1-56.437-1"
      ></Path>
      <Path
        fill="url(#radialGradient3495)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1.7"
        d="M476.053 97.319c-4.925 0-28.393.744-29.782 1.375s-6.707 2.932-7.843 3.437c-.481.214-1.331 2.122-2.157 4.25.047-.03.139-.075.157-.093.714-.715 5.196-2.474 6.625-3.188 1.428-.714 11.78-1.259 15.53-1.437s41.974-.366 76.438 1.062c34.465 1.429 85.884 7.143 93.563 8.75 7.678 1.607 12.312 4.643 14.812 12.5s4.657 41.603 4.657 43.031c0 1.429-1.625 3.21-4.125 5.532s-6.072 2.696-36.25 4.125-86.42-1.255-148.563-4.47c-62.143-3.213-70.357-5.704-75-7.312-4.643-1.607-2.5-3.03-2.5-3.03.008.003.042-.047.063-.063-1.186.045-2.064.062-2.094.062-.631 1.01-1.624 1.894-1.75 3.156s.986 3.4 2.375 4.032c1.389.631 12.132 3.026 17.687 3.53 5.556.506 78.535 6.713 103.032 7.345 24.496.631 89.91 1.376 98.75 1.25 8.838-.127 37.498-.771 40.78-1.782 3.284-1.01 9.338-3.022 9.97-7.062.63-4.04.19-25.604-3.282-47.469-3.221-20.29-34.837-19.785-50-21.719-9.032-1.151-57.964-4.686-64.656-4.812s-51.513-1-56.437-1"
      ></Path>
      <Path
        fill="url(#linearGradient3509)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M552.567 123.686s20.309 10.504 30.113 12.605 54.621 3.502 54.621 3.502l.7 22.409-4.201 7.002-84.034-5.602-28.711-12.605s32.913-18.907 31.512-27.31"
      ></Path>
      <Path
        fill="#152032"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m426.196 159.425 30.7-50.012h-3.96l-32.682 51.498z"
      ></Path>
      <Path
        fill="url(#linearGradient3522)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M440.061 106.442s13.37 2.97 21.788 3.466c8.418.495 41.099-1.98 46.546-1.98s28.225-2.972 28.225-2.972-38.129-2.476-43.08-2.476-41.595 0-46.547 1.486-7.922 2.97-6.932 2.476"
      ></Path>
      <Path
        fill="#334d77"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m399.952 166.853 76.257-8.913 20.302-33.672 7.427-12.38h-3.961l-25.749 42.586-51.993 4.951 32.741-50.072-2.826-.145-31.896 50.217z"
      ></Path>
      <Path
        fill="url(#linearGradient3532)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M467.271 101.538c-4.648.02-7.75.08-8.687.125-3.75.178-14.103.723-15.531 1.437s-5.911 2.473-6.625 3.188c-.1.1-.718.413-1.594.843-.876 1.15-1.787 2.33-2.875 3.282-2.857 2.5-47.844 50.343-47.844 50.343l-2.25.813c-.13.166-.226.293-.25.281 0 0-2.143 1.424 2.5 3.031s12.857 4.099 75 7.313 118.384 5.897 148.563 4.469c30.178-1.429 33.75-1.804 36.25-4.125 2.5-2.322 4.125-4.103 4.125-5.532 0-1.428-2.157-35.174-4.657-43.03-2.5-7.858-7.134-10.894-14.812-12.5-7.679-1.608-59.098-7.322-93.563-8.75-25.848-1.072-53.804-1.247-67.75-1.188"
      ></Path>
      <Path
        fill="url(#linearGradient3542)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M467.271 101.538c-4.648.02-7.75.08-8.687.125-3.75.178-14.103.723-15.531 1.437s-5.911 2.473-6.625 3.188c-.1.1-.718.413-1.594.843-.876 1.15-1.787 2.33-2.875 3.282-2.857 2.5-47.844 50.343-47.844 50.343l-2.25.813c-.13.166-.226.293-.25.281 0 0-2.143 1.424 2.5 3.031s12.857 4.099 75 7.313 118.384 5.897 148.563 4.469c30.178-1.429 33.75-1.804 36.25-4.125 2.5-2.322 4.125-4.103 4.125-5.532 0-1.428-2.157-35.174-4.657-43.03-2.5-7.858-7.134-10.894-14.812-12.5-7.679-1.608-59.098-7.322-93.563-8.75-25.848-1.072-53.804-1.247-67.75-1.188"
      ></Path>
      <Path
        fill="url(#linearGradient3546)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M467.271 101.538c-4.648.02-7.75.08-8.687.125-3.75.178-14.103.723-15.531 1.437s-5.911 2.473-6.625 3.188c-.1.1-.718.413-1.594.843-.876 1.15-1.787 2.33-2.875 3.282-2.857 2.5-47.844 50.343-47.844 50.343l-2.25.813c-.13.166-.226.293-.25.281 0 0-2.143 1.424 2.5 3.031s12.857 4.099 75 7.313 118.384 5.897 148.563 4.469c30.178-1.429 33.75-1.804 36.25-4.125 2.5-2.322 4.125-4.103 4.125-5.532 0-1.428-2.157-35.174-4.657-43.03-2.5-7.858-7.134-10.894-14.812-12.5-7.679-1.608-59.098-7.322-93.563-8.75-25.848-1.072-53.804-1.247-67.75-1.188"
      ></Path>
      <Path
        fill="url(#linearGradient3550)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M467.271 101.538c-4.648.02-7.75.08-8.687.125-3.75.178-14.103.723-15.531 1.437s-5.911 2.473-6.625 3.188c-.1.1-.718.413-1.594.843-.876 1.15-1.787 2.33-2.875 3.282-2.857 2.5-47.844 50.343-47.844 50.343l-2.25.813c-.13.166-.226.293-.25.281 0 0-2.143 1.424 2.5 3.031s12.857 4.099 75 7.313 118.384 5.897 148.563 4.469c30.178-1.429 33.75-1.804 36.25-4.125 2.5-2.322 4.125-4.103 4.125-5.532 0-1.428-2.157-35.174-4.657-43.03-2.5-7.858-7.134-10.894-14.812-12.5-7.679-1.608-59.098-7.322-93.563-8.75-25.848-1.072-53.804-1.247-67.75-1.188"
      ></Path>
      <Path
        fill="url(#linearGradient3560)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M467.271 101.538c-4.648.02-7.75.08-8.687.125-3.75.178-14.103.723-15.531 1.437s-5.911 2.473-6.625 3.188c-.1.1-.718.413-1.594.843-.876 1.15-1.787 2.33-2.875 3.282-2.857 2.5-47.844 50.343-47.844 50.343l-2.25.813c-.13.166-.226.293-.25.281 0 0-2.143 1.424 2.5 3.031s12.857 4.099 75 7.313 118.384 5.897 148.563 4.469c30.178-1.429 33.75-1.804 36.25-4.125 2.5-2.322 4.125-4.103 4.125-5.532 0-1.428-2.157-35.174-4.657-43.03-2.5-7.858-7.134-10.894-14.812-12.5-7.679-1.608-59.098-7.322-93.563-8.75-25.848-1.072-53.804-1.247-67.75-1.188"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient3285)"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1.7"
        d="M658.044 178.98s-8.572 3.929-10.715 5.357c-2.142 1.43-5 4.286-5.357 6.786s3.572 12.5 7.857 19.643 7.5 17.857 7.858 21.071 3.214 35.715 1.428 47.5c-1.786 11.786-7.143 46.43-7.143 46.43"
      ></Path>
      <Path
        fill="url(#linearGradient3616)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M438.072 105.83s5.158 2.741 11.847 3.59c13.083 1.66 31.262 1.661 36.822 1.661 8.404 0 47.62-.7 47.62-.7s42.016-2.1 64.425.7c22.409 2.801 38.866 4.902 38.866 4.902s3.851-4.902-31.863-7.703c-37.238-2.92-90.336-5.602-90.336-5.602s-34.993-1.594-54.272-1.05c-24.51.7-23.11 4.201-23.11 4.201"
      ></Path>
      <Path
        fill="url(#linearGradient3674)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M660.76 134.19s22.61-.07 26.962-3.501c2.818-2.221-.7-7.003.896-13.07l2.605-.235s2.1 8.753 5.602 22.059a4992 4992 0 0 1 7.353 28.36l-32.563 7.004z"
      ></Path>
      <Path
        fill="#03222f"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M662.511 137.692s28.362-1.4 30.463-2.101c2.1-.7 2.8-1.4 2.8-1.4l-5.251-16.107-3.502-1.75s3.502 13.305 2.101 14.005-12.955 3.501-16.807 3.851-11.204.7-11.204.7z"
        opacity="0.117"
      ></Path>
      <Path
        fill="#a0bcc8"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m543.115 111.069 13.313 9.812s20.985 10.843 26.937 12.594 22.783 3.163 34.688 2.813c4.138-.122 10.934-.09 18.062-.032l-.312-3.156c-13.678.054-27.838.197-35.282.031-15.756-.35-21.352-2.441-31.156-7.343s-26.25-14.72-26.25-14.72m146.719 18.906s-11.222 5.276-19.625 3.875c-1.706-.284-4.982-.48-9.188-.594l1.157 3.313c1.132.015 4.401.062 4.875.062 4.201 0 15.76-2.08 19.611-2.43s3.17-4.226 3.17-4.226"
      ></Path>
      <Path
        fill="#264c5f"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m667.764 171.305-14.006-55.322s-1.05-.7-3.151 1.05 2.1-1.05 2.45.35c.35 1.401 12.606 54.272 12.606 54.272z"
      ></Path>
      <Path
        fill="#264c5f"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m656.91 175.157 10.854-2.101.35 1.75-10.504 2.102z"
      ></Path>
      <Path
        fill="#172f3b"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M652.708 112.132s-4.552 0-4.552 2.45c0 2.452 3.151 0 4.552-2.45"
      ></Path>
      <Path
        fill="url(#linearGradient3697)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="url(#linearGradient3644)"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1.6"
        d="m649.683 118.405 2.525-2.273 1.01-.505 13.89 56.064-10.86 1.767-6.06-48.74z"
        opacity="0.388"
      ></Path>
      <Path
        fill="url(#linearGradient3707)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1.6"
        d="m649.683 118.405 2.525-2.273 1.01-.505 13.89 56.064-10.86 1.767-6.06-48.74z"
        opacity="1"
      ></Path>
      <Path
        fill="url(#linearGradient3723)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M692.503 112.074s14.088 38.548 15.527 43.825c2.1 7.703 4.902 13.305 4.902 13.305s2.804-6.539 7.488-10.746c3.426-3.077 8.835-4.255 10.019-3.96 2.8.7-24.631-34.721-37.936-42.424"
      ></Path>
      <Path
        fill="url(#radialGradient3743)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M712.068 169.578s15.338 6.071 19.54 13.074c4.201 7.003 18.934-7.498 17.533-12.4s-8.181-14.851-17.285-14.851-9.632-1.139-12.433 3.763-7.355 11.115-7.355 10.414"
      ></Path>
      <Path
        fill="url(#linearGradient3517)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M697.239 115.218s9.352 35.404 10.79 40.681c2.102 7.703 4.903 13.305 4.903 13.305s2.804-6.539 7.488-10.746c3.426-3.077 8.8-3.92 10.019-3.96 4.015-.13-13.801-32.739-30.358-40.774-1.485-.72-.634 4.077-2.842 1.494"
        opacity="0.792"
      ></Path>
      <Path
        fill="#e5c645"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M77.204 326.223s2.431 12.642 15.56 16.531c7.1 2.104-19.45-6.32-19.45-6.32l-.972-10.697s1.459 1.459 4.862.486"
      ></Path>
      <Path
        fill="url(#linearGradient3945)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M561.313 384.712c4.227.25 6.217-.746 9.325-1.119l44.512-25.612s76.34-45.507 87.282-51.972 28.472-21.261 28.472-21.261-3.108-2.611-.621-11.066-.498-6.962-.498-6.962-80.568 44.262-96.483 53.214c-15.914 8.952-46.252 27.354-48.241 28.846-1.99 1.492-1.292 8.913-1.99 15.417-.994 9.279-4.973 10.444-11.438 14.423s-8.455 5.098-10.32 6.092"
        opacity="1"
      ></Path>
      <Path
        fill="url(#linearGradient4564)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M539.306 119.508s27.85 16.91 36.803 17.904c8.952.995 11.936 16.91 25.861 19.894s39.787 8.952 39.787 8.952 0 7.957-4.973 8.952c-4.974.994-34.814 0-34.814 0l-129.307-4.974 23.872-30.834s39.787-15.915 42.771-19.894"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="2"
        d="M736.095 205.602c.698-.507 1.513-.807 2.292-1.16 1.12-.491 1.975-1.306 2.73-2.245.717-.953 1.292-1.998 1.847-3.05.418-.91 1.073-1.674 1.732-2.417.711-.703 1.218-1.566 1.842-2.338 1.325-.808 3.159-.597 4.61-.146.777.586 3.965.804.917.713.882-.176 1.666-.642 2.468-1.029.89-.431 1.797-.828 2.683-1.269.811-.421 1.55-.958 2.299-1.48a49 49 0 0 1 2.584-1.57c.804-.511 1.714-.794 2.603-1.114.912-.375 1.643-.87 2.103-1.754.357-.875.54-1.81.77-2.724.177-.87.387-1.731.643-2.582.288-.94.556-1.887.832-2.83.234-.791.396-1.597.521-2.41.141-.912.134-1.834.2-2.751.244-.96.695-1.856 1.113-2.75 2.54.358 2.148 1.064 1.735 2.96-.269.871-.386 1.775-.58 2.664-.261 1.09-.553 2.172-.78 3.27-.21 1.17-.424 2.338-.786 3.471-.293 1.017-.954 1.811-1.655 2.574-.818.83-1.624 1.669-2.367 2.567-.64.801-1.379 1.46-2.303 1.906-.86.399-1.806.545-2.7.848-.813.304-1.609.651-2.414.977-.892.356-1.777.731-2.667 1.095a12 12 0 0 0-2.632 1.373c-.82.542-1.581 1.161-2.452 1.617-.847.39-1.661.715-2.261 1.45-.391.993-1.025 1.628-1.939 2.158-.954.413-1.854.873-2.668 1.523-.807.703-1.504 1.524-2.13 2.388-.482.927-1.159 1.501-2.06 1.996-.896.396-1.791.787-2.664 1.233-.765.499-1.558.902-2.437 1.15-.989.2-1.986.343-2.969.571-.92.224-1.82.524-2.707.854-.93.342-1.743.9-2.493 1.537-.697.653-1.56 1.011-2.461 1.28-.871.303-1.79.38-2.694.526-.953.182-1.857-1.459-2.792-1.21-.948.147-1.881.31-2.783.641-.88.332-1.663.86-2.463 1.345a33 33 0 0 1-2.301 1.576c-1.555.839-3.375 1.01-3.742-.927-.167-1.168.33-1.928 1.432-2.244.955-.153 1.926-.167 2.887-.292 1.113-.135 2.163-.525 3.196-.938a10.9 10.9 0 0 1 3.105-.81c1.264-.054 2.475 1.63 3.661 1.212 1.329-.47 2.519-1.226 3.708-1.965 1.402-.91 2.952-1.53 4.515-2.098 1.248-.432 2.503-.836 3.733-1.32l1.775.213c-1.235.494-2.499.896-3.758 1.322-1.552.558-3.095 1.162-4.487 2.063-1.186.752-2.372 1.523-3.7 2.004-1.171.433-2.37.782-3.627.838-1.075.103-2.127-1.67-3.125-1.245-1.029.423-2.07.842-3.18.987-.96.128-1.922.183-2.885.272-1.059.22-1.579.835-1.42 1.964.093.408 1.018 1.003.61 1.096-2.87.66-1.109-.09-.54-.324.821-.461 1.559-1.033 2.333-1.566.774-.523 1.57-1.013 2.428-1.39.914-.325 1.84-.557 2.81-.654.939-.236 1.835 1.395 2.782 1.193.898-.16 1.82-.207 2.688-.506.888-.253 1.768-.55 2.447-1.207.779-.621 1.564-1.232 2.503-1.6.895-.313 1.786-.64 2.706-.877.986-.208 1.974-.39 2.966-.566.9-.21 1.69-.607 2.47-1.102.853-.47 1.737-.86 2.634-1.239.905-.434 1.603-.986 2.05-1.91.653-.866 1.358-1.7 2.159-2.434.817-.66 1.672-1.178 2.66-1.555.93-.493 1.561-1.08 1.93-2.084.583-.794 1.382-1.168 2.284-1.527.858-.459 1.629-1.04 2.423-1.6.837-.55 1.687-1.054 2.63-1.413.895-.347 1.78-.72 2.664-1.095.812-.324 1.618-.661 2.43-.984.897-.31 1.832-.476 2.715-.825.905-.43 1.672-1.02 2.276-1.83.768-.888 1.584-1.73 2.4-2.572.677-.745 1.323-1.52 1.63-2.498.387-1.121.608-2.284.815-3.449.222-1.096.488-2.182.727-3.275.198-.889.36-1.787.592-2.667.475-1.73-.367-2.47 1.951-2.835-.423.87-.836 1.752-1.103 2.684-.083.92-.055 1.848-.19 2.763a16.4 16.4 0 0 1-.536 2.435c-.282.943-.552 1.889-.831 2.832q-.374 1.272-.636 2.573c-.231.93-.466 1.86-.765 2.771-.504.91-1.154 1.464-2.111 1.886-.886.336-1.82.561-2.624 1.084a48 48 0 0 0-2.575 1.552c-.746.544-1.501 1.083-2.328 1.502-.863.479-1.78.85-2.67 1.275-.804.396-1.586.86-2.456 1.1-1.844.021-2.967.006-4.57-.753-2.104-.565 1.848-.476-.95.04-.654.75-1.124 1.651-1.855 2.342-.65.734-1.296 1.482-1.724 2.375-.578 1.055-1.163 2.11-1.88 3.08-.744.96-1.583 1.812-2.704 2.332-.765.364-1.571.656-2.28 1.128z"
        color="#000"
        opacity="0.709"
        visibility="visible"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="2"
        d="M645.772 232.47c2.664-1.178 5.393-2.197 8.122-3.213a99 99 0 0 0 5.835-2.296c12.897-1.013-.866 2.952 5.528-.85 1.815-1.19 3.294-2.785 4.805-4.324.916-2.91 6.853-3.227 4.583.394.263-.079 1.06-.187.79-.236-7.382-1.33 3.506-.58 3.932-.534 2.756.401-2.82.01-2.116.035l4.538.185c.357.056.71.137 1.07.168.306.027 1.226.015.92.006-.947-.03-1.894-.043-2.841-.065 1.843-.371 3.486-1.194 5.356-1.477 1.887-.148 3.671-.723 5.426-1.394 2.08-.263 3.776-1.166 5.468-2.347 3.193-2.832 4.216-4.602 8.904-4.441.33.02 1.325.057.993.061-5.879.072 1.443.092 3.943.859.294-.018 1.175-.015.883-.052-4.584-.585-1.513-.557.678-1.928 5.726.3.4 1.557-1.47 2.64-1.618 1.003-3.489 1.17-5.312 1.52-1.856.52-3.769 2.742-5.624 3.26-3.008.987-6.206.474-9.313.333 6.443-.517-.629.493-2.203 1.008-1.8.693-3.646 1.215-5.52 1.67-2.211.578-4.398 1.244-6.613 1.808-1.96.28-3.72.964-5.428 1.933-1.6 1.016-3.191 2.034-4.998 2.629-1.69.397-3.415.574-5.111.948q-2.79.617-5.592 1.183c-1.733.345-3.397.881-5.004 1.61-1.629.75-3.14 1.718-4.663 2.656-1.621.91-3.304 1.698-4.98 2.5-1.639.834-3.488.965-5.23 1.467-1.73.647-3.524.962-5.354 1.135-2.08.16-4.18.094-6.259.064-.313-.005-1.252-.06-.938-.059 3.451.015 3.2-.002 1.582.17-1.936.242-3.626 1.213-5.272 2.194l-.768.58-3.669-.328.741-.639c1.686-.969 3.377-2.029 5.33-2.34 14.575-1.756-.458.94 5.614-.185 1.813-.15 3.609-.406 5.32-1.061 1.718-.569 3.573-.605 5.213-1.422 1.708-.743 3.354-1.608 5.013-2.452 1.53-.922 3-1.95 4.625-2.703 1.628-.76 3.313-1.357 5.085-1.682 1.847-.417 3.708-.767 5.556-1.182 1.693-.398 3.405-.636 5.12-.921 1.826-.511 3.4-1.571 5.02-2.536 1.676-1.064 3.425-1.798 5.416-2.044 2.228-.539 4.42-1.21 6.631-1.807 1.86-.455 3.696-.962 5.485-1.646 3.18-1.05 6.062-1.458 9.5-1.106 4.797.304-3.925.518 1.99-.258 1.869-.496 3.763-.764 5.623-1.286 1.799-.353 3.682-2.432 5.29-3.404 3.167-1.745 4.802-2.796 8.873-1.888-2.729 1.872-5.426 2.723-8.93 2.053-1.836-.971-1.226-.416 2.303-1.041.125-.022-5.862 2.67-7.19 2.214 4.962-.243-.126.193-1.66 2.261-1.65 1.217-3.313 2.286-5.418 2.45-1.769.663-3.548 1.33-5.45 1.476-1.904.216-3.515.972-5.34 1.495-.095.002-3.918.194-5.369.027-.375-.044-1.488-.103-1.118-.176 6.477-1.274-.006 1.154-2.456-.357 7.16-.932-3.02 1.746-4.733.181 2.07-2.96 7.6-3.157 2.724.102-1.495 1.563-2.927 3.195-4.723 4.428-2.356 1.395-11.637 1.33-5.541.9-1.96.802-3.902 1.644-5.92 2.301-2.733 1.007-5.476 1.994-8.133 3.195z"
        color="#000"
        opacity="0.552"
        visibility="visible"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M658.166 179.53c-5.405 2.115-9.098 3.58-11.633 5.5-2.536 1.92-3.84 3.859-4.032 5.907-.196 2.093.767 5.79 2.094 9.593s3.031 7.636 4.563 9.72l.11-.36c-1.394-1.896-3.007-5.89-4.203-9.672-1.195-3.779-1.718-7.536-1.564-9.188.16-1.696 1.217-3.363 3.625-5.187s6.14-3.746 11.5-5.844z"
        opacity="0.43"
      ></Path>
      <Path
        fill="url(#linearGradient5303)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M537.515 181.694c1.323 0 69.5 4.303 91.673.993-28.793 9.598-113.185 25.814-113.185 25.814s17.21-5.626 22.504-10.259c5.296-4.633 7.281-7.943-2.978-6.62-10.26 1.325-35.412 1.987-22.174 0 13.238-1.985 23.829-8.935 24.16-9.928"
      ></Path>
      <Path
        fill="url(#linearGradient5059)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M699.431 113.574c-9.496-12.086-33.288-18.075-58.892-21.284-25.454-3.19-5.805 15.358-.605 15.721s18.381.121 18.381.121 23.582.726 30.112 2.54c6.53 1.813 9.311 4.837 9.311 4.837 2.267 1.482 1.936-.281 1.693-1.935"
        color="#000"
        opacity="0.792"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#radialGradient4405)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M699.431 113.574c-9.496-12.086-33.288-18.075-58.892-21.284-25.454-3.19 1.152 26.343 3.842 21.878 3.49-5.794 13.934-6.036 13.934-6.036s23.582.726 30.112 2.54c6.53 1.813 9.311 4.837 9.311 4.837 2.267 1.482 1.936-.281 1.693-1.935"
        color="#000"
        opacity="0.13"
        visibility="visible"
      ></Path>
    </G>
    <G strokeLinejoin="miter" strokeOpacity="1" opacity="1">
      <Path
        fill="url(#radialGradient3308)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="url(#linearGradient3290)"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M106.424 245.705s8.806-8.092 14.877-9.163c6.072-1.072 14.243-.062 17.814 4.224 3.572 4.286 8.442 12.908 5.714 20.357-4.628 12.643-26.446 33.867-39.242 45.296-12.244 10.936-20.758 16.49-24.329 17.918-3.571 1.43-5.4 3.067-7.543 1.281s-.776-16.446.4-23.066c.97-5.46 7.168-23.153 12.9-31.028 7.19-9.877 11.2-15.621 13.467-17.396 3.763-2.944 6.656-5.566 5.942-8.423z"
      ></Path>
      <Path
        fill="url(#radialGradient3260)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M103.217 253.534c2.917-2.674 4.133-7.293 8.022-9.724s6.807-6.564 14.1-5.835c7.294.73 14.1 5.348 14.83 9.724s.973 13.371.243 15.316c-.729 1.945-25.283 28.93-27.228 30.389s-14.343 10.94-18.962 9.238c-4.62-1.702-3.16-31.604 2.917-40.113 6.078-8.509 6.32-9.238 6.078-8.995"
      ></Path>
      <Path
        fill="url(#radialGradient3468)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M178.092 382.582a4.126 18.737 0 1 1-8.252 0 4.126 18.737 0 1 1 8.252 0"
        color="#000"
        opacity="1"
        transform="rotate(28.36 329.835 169.86)"
        visibility="visible"
      ></Path>
      <Path
        fill="#131001"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M302.403 329.765s-12.38 20.302-15.846 30.205c-3.466 9.904 1.486 13.865 4.457 15.846s13.37 7.923 31.196 7.427c17.826-.495 33.839-3.15 33.839-3.15l31.029-10.22s-41.595 15.846-63.383 11.885c-21.787-3.962-37.138-6.437-35.652-19.312s15.846-32.681 14.36-32.681"
        opacity="0.579"
      ></Path>
      <Path
        fill="url(#radialGradient3999)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M351.94 283.818c6.061-4.294 31.567-23.486 51.77-6.566s19.193 47.224 15.153 57.578-13.89 25.76-29.547 33.84c-15.658 8.082-40.406 13.132-51.013 13.637s-27.78 0-36.365-2.777c-8.587-2.778-16.668-9.85-14.648-18.94 2.02-9.092 12.364-25.767 16.92-31.82 17.678-23.487 41.67-40.66 47.73-44.952"
      ></Path>
      <Path
        fill="url(#radialGradient3995)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M351.94 283.818c6.061-4.294 31.567-23.486 51.77-6.566s19.193 47.224 15.153 57.578-13.89 25.76-29.547 33.84c-15.658 8.082-40.406 13.132-51.013 13.637s-27.78 0-36.365-2.777c-8.587-2.778-16.668-9.85-14.648-18.94 2.02-9.092 12.364-25.767 16.92-31.82 17.678-23.487 41.67-40.66 47.73-44.952"
      ></Path>
      <Path
        fill="#f8ffff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M383.959 270.413c-14.507.46-27.865 10.454-32.031 13.406-6.061 4.293-30.041 21.451-47.72 44.937-4.555 6.053-14.885 22.753-16.905 31.844s6.038 16.16 14.625 18.938 25.768 3.286 36.375 2.78c10.606-.504 35.342-5.574 51-13.655 15.657-8.082 25.522-23.49 29.562-33.844s5.047-40.643-15.156-57.563c-6.314-5.287-13.156-7.052-19.75-6.843m-3.125 2.937c1.002-.021 1.984.024 2.969.188 10.504 1.75 17.86 5.62 23.812 16.125s11.553 32.192 3.5 50.75c-8.053 18.557-39.921 31.167-49.375 33.968s-47.616 3.851-54.969 1.75-19.27-9.088-12.968-23.093 15.797-28.695 25.562-38.875c14.92-15.555 23.63-21.781 31.156-26.25 10.154-6.03 20.626-14.357 30.313-14.563"
      ></Path>
      <Path
        fill="url(#radialGradient4213)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M351.94 283.818c6.061-4.294 31.567-23.486 51.77-6.566s19.193 47.224 15.153 57.578-13.89 25.76-29.547 33.84c-15.658 8.082-40.406 13.132-51.013 13.637s-27.78 0-36.365-2.777c-8.587-2.778-16.668-9.85-14.648-18.94 2.02-9.092 12.364-25.767 16.92-31.82 17.678-23.487 41.67-40.66 47.73-44.952"
      ></Path>
      <Path
        fill="#acb7cd"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M491.211 412.081a25.254 31.443 0 1 1-50.507 0 25.254 31.443 0 1 1 50.507 0"
        opacity="0.792"
        transform="matrix(1.05063 -.13143 .1378 1.10165 -158.436 -79.057)"
      ></Path>
      <Path
        fill="url(#radialGradient3798)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M491.211 412.081a25.254 31.443 0 1 1-50.507 0 25.254 31.443 0 1 1 50.507 0"
        opacity="0.792"
        transform="matrix(1.05063 -.13143 .1378 1.10165 -158.436 -79.057)"
      ></Path>
      <Path
        fill="url(#radialGradient3790)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M491.211 412.081a25.254 31.443 0 1 1-50.507 0 25.254 31.443 0 1 1 50.507 0"
        opacity="0.792"
        transform="matrix(1.05063 -.13143 .1378 1.10165 -158.436 -79.057)"
      ></Path>
      <Path
        fill="url(#radialGradient3794)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="url(#radialGradient4007)"
        strokeLinecap="round"
        strokeWidth="1.79"
        d="M414.462 310.703c2.392 19.121-6.63 35.659-22.226 37.61-15.595 1.95-28.065-11.898-30.457-31.02-2.392-19.12 6.196-36.31 21.79-38.26 15.596-1.95 28.5 12.55 30.893 31.67z"
        opacity="0.792"
      ></Path>
      <Path
        fill="#acb7cd"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M491.211 412.081a25.254 31.443 0 1 1-50.507 0 25.254 31.443 0 1 1 50.507 0"
        opacity="0.792"
        transform="matrix(.97281 -.1217 .11826 .94539 -114.118 -19.2)"
      ></Path>
      <Path
        fill="url(#radialGradient3808)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M491.211 412.081a25.254 31.443 0 1 1-50.507 0 25.254 31.443 0 1 1 50.507 0"
        opacity="0.867"
        transform="matrix(.97281 -.1217 .11826 .94539 -114.118 -19.2)"
      ></Path>
      <Path
        fill="#8eacb3"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M491.211 412.081a25.254 31.443 0 1 1-50.507 0 25.254 31.443 0 1 1 50.507 0"
        opacity="0.792"
        transform="matrix(.87553 -.10952 .11044 .88288 -66.12 .456)"
      ></Path>
      <Path
        fill="url(#radialGradient3839)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M491.211 412.081a25.254 31.443 0 1 1-50.507 0 25.254 31.443 0 1 1 50.507 0"
        opacity="0.792"
        transform="matrix(.87553 -.10952 .11044 .88288 -66.12 .456)"
      ></Path>
      <Path
        fill="#b3a28e"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M383.884 285.476c-11.391 1.425-19.427 13.441-18.89 27.495 8.005.648 20.425 1.248 26.985-.541 4.52-1.234 10.841-4.1 16.493-6.882-3.49-12.719-13.736-21.43-24.588-20.072"
        opacity="0.792"
      ></Path>
      <Path
        fill="url(#radialGradient3857)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="1.6"
        d="M383.884 285.476c-11.391 1.425-19.427 13.441-18.89 27.495 8.005.648 20.425 1.248 26.985-.541 4.52-1.234 10.841-4.1 16.493-6.882-3.49-12.719-13.736-21.43-24.588-20.072"
        opacity="1"
      ></Path>
      <Path
        fill="url(#linearGradient4074)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M383.959 270.413c-14.507.46-27.865 10.454-32.031 13.406-6.061 4.293-30.041 21.451-47.72 44.937-4.555 6.053-14.885 22.753-16.905 31.844s6.038 16.16 14.625 18.938 25.768 3.286 36.375 2.78c10.606-.504 35.342-5.574 51-13.655 15.657-8.082 25.522-23.49 29.562-33.844s5.047-40.643-15.156-57.563c-6.314-5.287-13.156-7.052-19.75-6.843m-3.125 2.937c1.002-.021 1.984.024 2.969.188 10.504 1.75 17.86 5.62 23.812 16.125s11.553 32.192 3.5 50.75c-8.053 18.557-39.921 31.167-49.375 33.968s-47.616 3.851-54.969 1.75-19.27-9.088-12.968-23.093 15.797-28.695 25.562-38.875c14.92-15.555 23.63-21.781 31.156-26.25 10.154-6.03 20.626-14.357 30.313-14.563"
      ></Path>
      <Path
        fill="url(#radialGradient4084)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M383.959 270.413c-14.507.46-27.865 10.454-32.031 13.406-6.061 4.293-30.041 21.451-47.72 44.937-4.555 6.053-14.885 22.753-16.905 31.844s6.038 16.16 14.625 18.938 25.768 3.286 36.375 2.78c10.606-.504 35.342-5.574 51-13.655 15.657-8.082 25.522-23.49 29.562-33.844s5.047-40.643-15.156-57.563c-6.314-5.287-13.156-7.052-19.75-6.843m-3.125 2.937c1.002-.021 1.984.024 2.969.188 10.504 1.75 17.86 5.62 23.812 16.125s11.553 32.192 3.5 50.75c-8.053 18.557-39.921 31.167-49.375 33.968s-47.616 3.851-54.969 1.75-19.27-9.088-12.968-23.093 15.797-28.695 25.562-38.875c14.92-15.555 23.63-21.781 31.156-26.25 10.154-6.03 20.626-14.357 30.313-14.563"
      ></Path>
      <Path
        fill="url(#radialGradient4088)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M383.959 270.413c-14.507.46-27.865 10.454-32.031 13.406-6.061 4.293-30.041 21.451-47.72 44.937-4.555 6.053-14.885 22.753-16.905 31.844s6.038 16.16 14.625 18.938 25.768 3.286 36.375 2.78c10.606-.504 35.342-5.574 51-13.655 15.657-8.082 25.522-23.49 29.562-33.844s5.047-40.643-15.156-57.563c-6.314-5.287-13.156-7.052-19.75-6.843m-3.125 2.937c1.002-.021 1.984.024 2.969.188 10.504 1.75 17.86 5.62 23.812 16.125s11.553 32.192 3.5 50.75c-8.053 18.557-39.921 31.167-49.375 33.968s-47.616 3.851-54.969 1.75-19.27-9.088-12.968-23.093 15.797-28.695 25.562-38.875c14.92-15.555 23.63-21.781 31.156-26.25 10.154-6.03 20.626-14.357 30.313-14.563"
      ></Path>
      <Path
        fill="url(#radialGradient4092)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M383.959 270.413c-14.507.46-27.865 10.454-32.031 13.406-6.061 4.293-30.041 21.451-47.72 44.937-4.555 6.053-14.885 22.753-16.905 31.844s6.038 16.16 14.625 18.938 25.768 3.286 36.375 2.78c10.606-.504 35.342-5.574 51-13.655 15.657-8.082 25.522-23.49 29.562-33.844s5.047-40.643-15.156-57.563c-6.314-5.287-13.156-7.052-19.75-6.843m-3.125 2.937c1.002-.021 1.984.024 2.969.188 10.504 1.75 17.86 5.62 23.812 16.125s11.553 32.192 3.5 50.75c-8.053 18.557-39.921 31.167-49.375 33.968s-47.616 3.851-54.969 1.75-19.27-9.088-12.968-23.093 15.797-28.695 25.562-38.875c14.92-15.555 23.63-21.781 31.156-26.25 10.154-6.03 20.626-14.357 30.313-14.563"
      ></Path>
      <Path
        fill="url(#radialGradient4106)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M384.66 271.813c-14.508.46-28.566 9.054-32.732 12.006-6.061 4.293-30.041 21.451-47.72 44.937-4.555 6.053-14.885 22.753-16.905 31.844s6.038 16.16 14.625 18.938 25.768 3.286 36.375 2.78c10.606-.504 35.342-5.574 51-13.655 15.657-8.082 25.522-23.49 29.562-33.844s5.047-40.643-15.156-57.563c-6.314-5.287-12.456-5.652-19.05-5.443"
        opacity="0.625"
      ></Path>
      <Path
        fill="url(#radialGradient4158)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M392.524 366.903s15.846-11.884 18.817-17.331 10.399-21.293 10.399-27.235 1.98-16.34-.496-14.36-2.475 5.942-2.475 9.408c0 3.467-3.962 17.331-3.962 20.302s-7.923 14.36-10.398 16.836c-2.476 2.476-10.399 6.438-13.37 9.409-2.971 2.97-11.389 6.437-13.37 7.427s-8.418 2.971-12.38 3.466c-3.96.496-14.36.496-16.835 1.981s-5.942 4.457-10.399 4.457-15.845-.495-18.816-.99c-2.971-.496-2.476-.496-7.923-1.981s-10.399-3.962-9.903-1.981c.495 1.98 10.893 5.942 14.855 6.437s24.758 1.486 31.69 0 18.322-4.952 24.76-6.437c6.437-1.486 19.806-8.418 19.806-9.408"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M359.126 283.089s9.52-7.678 19.008-9.614c3.882-.792 14.718 2.618 16.676 3.653 2.672 1.412 9.09 8.843 10.81 10.624s4.976 7.862 4.976 7.862-10.013-16.214-21.805-18.731-21.527 1.445-29.665 6.206"
      ></Path>
      <Path
        fill="url(#radialGradient4172)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M351.94 283.818c6.061-4.294 31.567-23.486 51.77-6.566s19.193 47.224 15.153 57.578-13.89 25.76-29.547 33.84c-15.658 8.082-40.406 13.132-51.013 13.637s-27.78 0-36.365-2.777c-8.587-2.778-16.668-9.85-14.648-18.94 2.02-9.092 12.364-25.767 16.92-31.82 17.678-23.487 41.67-40.66 47.73-44.952"
        opacity="0.55"
      ></Path>
      <Path
        fill="#2e221c"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M362.997 302.067s5.005-13.85 12.927-16.339c7.923-2.488 14.894-2.611 19.5.306 6.22 3.938 9.828 6.755 12.193 11.699s5.59 12.774 5.13 17.074.215-8.261-3.195-15.57c-3.23-6.926-12.746-16.12-19.256-16.305-6.51-.183-14.157.524-16.43 2.305s-9.303 7.402-10.869 16.83"
        opacity="0.529"
      ></Path>
      <Path
        fill="#97705c"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M397.058 344.965s11.792-5.468 14.739-13.82c2.947-8.354 3.653-14.68 3.653-14.68s-.551 15.539-5.372 20.883-12.99 7.862-13.02 7.617"
      ></Path>
      <Path
        fill="url(#radialGradient3875)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M401.998 306.67s-5.037-12.345-13.39-11.3-15.6-1.043-17.872 4.73-2.947 12.346-2.947 12.346 5.958 3.746 9.274 2.333c3.317-1.413 3.316-9.397 7.738-9.95s10.441-.308 10.441-.308z"
        opacity="0.5"
      ></Path>
      <Path
        fill="none"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="url(#linearGradient3985)"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="3.1"
        d="M488.24 412.824a21.788 27.235 0 1 1-43.575 0 21.788 27.235 0 1 1 43.575 0z"
        opacity="0.5"
        transform="rotate(-7.13 -370.268 997.726)"
      ></Path>
      <Path
        fill="url(#radialGradient4028)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="3.1"
        d="M479.822 413.319a14.36 17.826 0 1 1-28.72 0 14.36 17.826 0 1 1 28.72 0"
        opacity="1"
        transform="rotate(-7.13 -370.763 989.778)"
      ></Path>
      <Path
        fill="url(#radialGradient4032)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="3.1"
        d="M479.822 413.319a14.36 17.826 0 1 1-28.72 0 14.36 17.826 0 1 1 28.72 0"
        opacity="0.45"
        transform="matrix(1.19756 -.1498 .1586 1.2679 -232.891 -143.162)"
      ></Path>
      <Path
        fill="url(#radialGradient4036)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="3.1"
        d="M479.822 413.319a14.36 17.826 0 1 1-28.72 0 14.36 17.826 0 1 1 28.72 0"
        opacity="0.45"
        transform="matrix(-1.09787 .50129 -.53073 -1.16234 1116.898 561.683)"
      ></Path>
      <Path
        fill="url(#radialGradient4046)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="3.1"
        d="M475.366 413.814a8.418 4.952 0 1 1-16.836 0 8.418 4.952 0 1 1 16.836 0"
        opacity="0.867"
        transform="rotate(-7.13 -370.763 989.778)"
      ></Path>
      <Path
        fill="url(#radialGradient4050)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="3.1"
        d="M475.366 413.814a8.418 4.952 0 1 1-16.836 0 8.418 4.952 0 1 1 16.836 0"
        opacity="0.867"
        transform="matrix(.87553 -.10952 .08689 .69459 -65.815 73.761)"
      ></Path>
      <Path
        fill="url(#radialGradient4054)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="3.1"
        d="M475.366 413.814a8.418 4.952 0 1 1-16.836 0 8.418 4.952 0 1 1 16.836 0"
        opacity="0.417"
        transform="matrix(.56348 -.679 .53867 .44703 -114 430.514)"
      ></Path>
      <Path
        fill="url(#radialGradient4058)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="3.1"
        d="M475.366 413.814a8.418 4.952 0 1 1-16.836 0 8.418 4.952 0 1 1 16.836 0"
        opacity="0.417"
        transform="matrix(.56348 -.679 .53867 .44703 -116.026 438.253)"
      ></Path>
      <Path
        fill="#bcb37c"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="3.1"
        d="M475.366 413.814a8.418 4.952 0 1 1-16.836 0 8.418 4.952 0 1 1 16.836 0"
        opacity="0.417"
        transform="matrix(.56348 -.679 .53867 .44703 -116.026 438.253)"
      ></Path>
      <Path
        fill="#bcb37c"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="3.1"
        d="M475.366 413.814a8.418 4.952 0 1 1-16.836 0 8.418 4.952 0 1 1 16.836 0"
        opacity="0.417"
        transform="matrix(.56348 -.679 .53867 .44703 -83.779 460.668)"
      ></Path>
      <Path
        fill="#bcb37c"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="3.1"
        d="M475.366 413.814a8.418 4.952 0 1 1-16.836 0 8.418 4.952 0 1 1 16.836 0"
        opacity="0.417"
        transform="matrix(-.1333 -1.1022 .8039 .43427 105.26 651.28)"
      ></Path>
      <Path
        fill="#fdfbf9"
        fillOpacity="0.461"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M295.47 360.465c31.692-28.72 46.547-40.604 46.547-40.604l10.894-11.884s-6.438 1.98-9.904 6.933c-3.466 4.951-12.38 12.874-15.845 15.35-3.467 2.476-23.769 21.292-23.769 21.292z"
      ></Path>
      <Path
        fill="#fdfbf9"
        fillOpacity="0.461"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M324.19 326.794c7.428-3.962 14.856-11.884 17.332-13.865s9.408-11.39 9.408-11.39l5.447-6.932s-7.428 8.914-9.904 11.39c-2.475 2.475-9.408 8.913-11.884 9.903s-8.913 9.408-10.398 10.894"
      ></Path>
      <Path
        fill="#fdfbf9"
        fillOpacity="0.461"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M290.519 358.485s7.923-2.476 13.37-9.904c5.446-7.427 5.446-9.903 9.408-13.37s7.923-7.922 7.923-7.922l3.961-5.447s-4.952 0-7.428 3.466-6.932 8.418-8.418 11.39c-1.485 2.97 0 3.465-4.951 8.417-4.952 4.952-8.418 10.399-8.418 10.399z"
      ></Path>
      <Path
        fill="#fdfbf9"
        fillOpacity="0.461"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M295.966 367.893s9.408-11.389 11.884-13.37 2.97-4.951 8.418-7.922 11.884-10.399 11.884-10.399l6.932-5.447 9.409-7.428s4.951-5.942 6.932-6.932c1.98-.99 2.971-2.971 4.952-3.961s-1.486 2.97-1.486 2.97-7.427 3.962-8.418 5.943-.495 1.98-8.913 8.418-10.398 7.427-11.884 10.398c-1.485 2.971-6.932 9.904-10.399 11.884s-4.951 3.467-8.417 7.428-10.4 7.923-10.894 8.418"
      ></Path>
      <Path
        fill="#fdfbf9"
        fillOpacity="0.461"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M380.685 291.87s3.991-7.985-.615-4.914-4.851 9.09-8.904 12.592c-4.054 3.501-7.739 5.958-7.739 5.958z"
      ></Path>
      <Path
        fill="#fdfbf9"
        fillOpacity="0.461"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m358.206 291.688 10.072-3.257s-.799-6.387 1.473-8.168c2.273-1.782-4.053 7.493-4.053 7.493l-3.623 2.949z"
      ></Path>
      <Path
        fill="#fdfbf9"
        fillOpacity="0.461"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M298.442 370.864c2.475-.99 34.167-17.826 34.167-17.826l21.787-10.894-4.952-4.457s-6.437 4.952-12.379 8.914-17.33 11.884-20.302 14.36c-2.971 2.475-18.321 10.893-18.321 9.903"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#radialGradient4130)"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1.6"
        d="M292.995 366.408s-3.962-15.35 15.35-38.624c19.312-23.273 35.653-36.643 43.575-40.604 7.923-3.962 19.807-12.875 24.759-13.865s16.34 2.476 16.34 2.476"
      ></Path>
      <Path
        fill="url(#radialGradient4140)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M295.966 367.893s14.855-37.633 25.254-47.041c10.398-9.409 48.527-43.08 48.527-43.08s-25.75 14.36-37.634 25.749-27.234 28.72-33.671 43.08c-6.438 14.36-1.981 22.282-2.476 21.292"
      ></Path>
      <Path
        fill="#483317"
        fillOpacity="0.855"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M414.807 327.784s1.217 17.725-29.215 37.138c-28.72 18.321-67.839 11.884-67.839 11.884s35.365 5.985 74.771-18.321c21.4-13.2 16.836-19.312 22.283-30.701"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M355.882 376.063s26.244-5.199 40.109-18.816 16.34-18.322 18.321-27.73c1.98-9.408 2.476 14.113-15.35 27.235-17.827 13.122-25.75 15.102-43.08 19.311"
      ></Path>
      <Path
        fill="#2e221c"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M413.165 324.44s-3.333 14.345-10.907 17.752-14.48 4.353-19.4 2c-6.64-3.176-10.556-5.547-13.489-10.177-2.932-4.63-7.06-12.025-7.11-16.348-.052-4.324.762 8.228 5.011 15.083 4.027 6.496 14.561 14.502 21.048 13.916s13.996-2.192 16.042-4.23c2.046-2.037 8.364-8.448 8.805-17.995"
        opacity="0.683"
      ></Path>
      <Path
        fill="url(#radialGradient4187)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M395.98 310.417s-.369-2.948-4.791-2.395-9.151 2.642-9.151 2.642-2.027 3.746-5.036 3.624c-3.01-.123-10.012-4.237-10.012-4.237s-1.105 3.132.615 4.913 9.336 2.825 11.301 2.579 7.8-1.475 7.8-1.475 3.686 5.528 8.353 2.947c4.668-2.58 10.011-3.747 9.151-6.634-.86-2.886-7.248-2.087-8.23-1.964"
        opacity="0.708"
      ></Path>
      <Path
        fill="url(#linearGradient3142)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M113.184 246.97s5.105-5.348 8.023-5.592 10.202-.823 14.343 6.078c4.376 7.293 5.349 14.83 5.349 14.83s-6.321 12.155-13.858 19.691c-7.536 7.537-9.238 10.211-9.238 10.211s-10.453-10.19-10.453-22.852c0-12.642 1.215-17.018 5.834-22.366"
      ></Path>
      <Path
        fill="url(#radialGradient3399)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M114.834 274.071c0 14.803 15.144 11.69-14.096 24.754-8.49 3.794-8.595-6.513-8.595-21.316s8.235-24.066 17.534-24.066c9.3 0 5.157 5.825 5.157 20.628"
        color="#000"
        opacity="0.403"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#linearGradient3150)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M119.991 288.785s-8.509-6.564-9.481-17.747-.243-18.72 3.16-22.366 12.156-6.321 17.99.486c5.835 6.807 8.51 14.83 8.51 14.83s-13.372 19.934-20.179 24.797"
      ></Path>
      <Path
        fill="url(#radialGradient3182)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M112.455 253.534c2.189-4.975 7.224-5.516 12.155-4.62 5.349.973 8.995 6.565 11.183 10.698 2.188 4.132 1.702 8.265 1.702 8.265l-16.531 20.908s-8.954-7.585-10.21-18.477c-.73-6.32-.409-11.98 1.7-16.774"
      ></Path>
      <Path
        fill="url(#radialGradient3166)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M120.928 248.569c-3.6.007-6.827 1.237-8.47 4.969-2.102 4.778-2.438 10.423-1.718 16.718 4.264-1.675 13.266-4.678 19.219-2.875a55 55 0 0 1 6.125 2.25l1.406-1.75s.5-4.148-1.687-8.28c-2.188-4.134-5.84-9.716-11.188-10.688a20.6 20.6 0 0 0-3.687-.344"
      ></Path>
      <Path
        fill="url(#radialGradient3208)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="3"
        d="M135.748 261.984c0 7.876-4.982 4.057-11.72 4.057-6.737 0-12.69 3.819-12.69-4.057s5.467-14.268 12.205-14.268c6.737 0 12.205 6.392 12.205 14.268"
        color="#000"
        opacity="0.717"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#radialGradient3218)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M120.928 248.569c-3.6.007-6.827 1.237-8.47 4.969-2.102 4.778-2.438 10.423-1.718 16.718 4.264-1.675 13.266-4.678 19.219-2.875a55 55 0 0 1 6.125 2.25l1.406-1.75s.5-4.148-1.687-8.28c-2.188-4.134-5.84-9.716-11.188-10.688a20.6 20.6 0 0 0-3.687-.344"
      ></Path>
      <Path
        fill="#583916"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M110.024 258.153s.972-7.293 3.646-9.238 7.294-6.321 13.128-3.16 9.968 10.21 11.426 14.343-1.458-7.293-5.105-10.94-9.481-6.564-12.885-5.348c-3.403 1.215-10.696 3.89-10.21 14.343"
        opacity="0.679"
      ></Path>
      <Path
        fill="url(#linearGradient3232)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M111.24 249.158c1.458-1.945 6.077-7.293 9.48-8.023s9.968 0 13.128 3.404 9.238 15.802 6.564 15.316c-2.674-.487-4.133-4.133-5.105-6.564s-2.674-6.078-5.591-7.78-4.133-2.674-8.266-1.945c-4.133.73-10.21 5.349-10.21 5.592"
      ></Path>
      <Path
        fill="url(#radialGradient3242)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="3"
        d="M172.607 330.81a8.144.972 0 1 1-16.289 0 8.144.972 0 1 1 16.289 0"
        color="#000"
        opacity="1"
        transform="matrix(.53731 0 0 1 33.325 -87.001)"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#radialGradient3246)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="3"
        d="M172.607 330.81a8.144.972 0 1 1-16.289 0 8.144.972 0 1 1 16.289 0"
        color="#000"
        opacity="1"
        transform="matrix(.50276 .18957 -.3528 .9357 161.31 -95.69)"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#radialGradient3250)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="3"
        d="M172.607 330.81a8.144.972 0 1 1-16.289 0 8.144.972 0 1 1 16.289 0"
        color="#000"
        opacity="1"
        transform="matrix(.39199 .3675 -.68394 .72954 292.72 -54.32)"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#linearGradient3272)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M111.482 252.805c1.945-2.188 1.46-4.863 6.321-6.321 4.862-1.459 7.78-2.188 11.67 1.215s6.077 6.807 6.806 8.995 1.702 8.023 1.702 8.023-4.862-13.614-11.669-14.83-10.21-1.458-14.83 2.918"
      ></Path>
      <Path
        fill="url(#linearGradient3282)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M112.698 252.805s1.79-3.136 5.956-4.012c3.693-.776 8.873.516 10.94 2.067 3.89 2.917 6.248 8.16 6.564 9.36.608 2.309 1.58 6.928 1.58 6.928s-3.282-12.642-8.144-15.073c-4.862-2.43-8.387-3.282-10.818-2.796s-4.012 1.338-6.078 3.526"
      ></Path>
      <Path
        fill="url(#radialGradient3298)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#abbcd1"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M106.08 246.049s8.806-8.092 14.877-9.164 14.243-.06 17.814 4.225c3.572 4.286 8.442 12.908 5.715 20.357-4.629 12.642-26.447 33.867-39.243 45.296C93 317.699 84.486 323.253 80.914 324.68s-5.4 3.067-7.543 1.28c-2.143-1.785-.776-16.446.4-23.065.97-5.46 7.169-23.153 12.9-31.029 7.19-9.876 11.2-15.62 13.468-17.395 3.762-2.944 6.655-5.566 5.941-8.423z"
        opacity="0.673"
      ></Path>
      <Path
        fill="url(#radialGradient3318)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M211.097 364.188a9.97 9.97 0 1 1-19.94 0 9.97 9.97 0 1 1 19.94 0"
        color="#000"
        opacity="0.673"
        transform="matrix(1 0 0 1.44828 -77.01 -262.313)"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#radialGradient3322)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M211.097 364.188a9.97 9.97 0 1 1-19.94 0 9.97 9.97 0 1 1 19.94 0"
        color="#000"
        opacity="0.673"
        transform="matrix(.72414 0 0 1.04875 -20.151 -118.731)"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#linearGradient3407)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M210.41 367.282a2.75 2.75 0 1 1-5.501 0 2.75 2.75 0 1 1 5.5 0"
        color="#000"
        opacity="0.673"
        transform="matrix(.64645 0 0 1 -3.994 -99.886)"
        visibility="visible"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient3334)"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M122.422 267.877s8.752-.972 13.128 1.459"
        opacity="0.849"
      ></Path>
      <Path
        fill="url(#linearGradient3352)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.4"
        d="M210.41 367.282a2.75 2.75 0 1 1-5.501 0 2.75 2.75 0 1 1 5.5 0"
        color="#000"
        opacity="0.673"
        transform="matrix(.64145 -.08024 .12412 .99227 213.93 -33.815)"
        visibility="visible"
      ></Path>
      <Path
        fill="url(#linearGradient3388)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M78.39 319.11s3.095-24.067 7.22-31.974c4.127-7.908 10.315-17.534 13.066-24.41 2.75-6.877 3.094-9.627 3.094-9.627s-13.752 13.408-16.847 19.253c-3.094 5.845-10.026 20.388-11.69 33.693-1.374 11.002 0 16.159 0 16.159z"
      ></Path>
      <Path
        fill="url(#linearGradient3380)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M79.079 319.454s3.094-24.067 7.22-31.974c4.125-7.908 10.314-17.535 13.064-24.41 2.75-6.877 3.094-9.627 3.094-9.627s-13.752 13.408-16.846 19.253-10.026 20.388-11.69 33.693c-1.375 11.002 0 16.159 0 16.159z"
        opacity="0.403"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="0.764"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M74.953 316.015c0-1.375 1.375-12.033 1.719-15.127s1.719-7.908 2.407-9.283 3.094-5.157 3.094-5.157l5.5-8.595 6.877-12.033s4.813-.688 1.375 2.063c-3.438 2.75-6.532 8.595-8.595 11.001-2.063 2.407-3.782 6.189-5.157 8.94s-3.438 14.44-3.438 14.44l-2.063 8.938z"
        opacity="0.711"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="0.764"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M78.39 317.047c.689-7.22 2.751-14.784 2.751-14.784s1.032-6.532 1.72-7.907.343-2.75 1.718-4.47 2.75-3.094 2.75-3.094.345 3.438-1.03 5.157c-1.376 1.72-2.751.344-3.439 6.532-.687 6.189-.687 5.845-1.375 8.596-.687 2.75-2.063 8.938-3.094 9.97"
        opacity="0.711"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="0.764"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m78.39 317.047 11.347-22.348.343-5.844 2.407-5.157s1.375-3.095 1.375-1.72 2.063 1.032 0 5.502-3.094 7.22-4.125 8.939-5.845 13.064-6.533 14.783c-.687 1.72-4.125 5.845-4.813 5.845"
        opacity="0.711"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="0.764"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m89.393 277.853 6.532-6.876 3.438-6.876 4.47-5.157.687 1.719s-1.031 1.719-2.75 3.781-4.814 5.845-6.189 7.22-3.438 5.501-3.438 5.501z"
        opacity="0.711"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="0.764"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M100.395 256.88c1.375-.687 6.876-5.156 6.876-5.156v3.782z"
        opacity="0.711"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="0.516"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m88.705 285.76 6.532-10.314 7.564-6.532 2.75-4.126s-.687 7.22-2.062 8.252c-1.375 1.031-6.189 5.157-6.189 5.157l-5.844 5.5z"
        opacity="0.711"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="0.764"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M107.614 251.38s9.97-8.252 13.753-9.283 5.844-2.407 5.844-2.407h-4.469s-5.5 2.063-6.876 3.095c-1.375 1.031-7.908 8.595-8.252 8.595"
        opacity="0.711"
      ></Path>
      <Path
        fill="url(#linearGradient3449)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M115.866 290.23s-7.22-9.97-7.736-14.44-.687-9.97-.687-9.97 2.234-.344 2.406.344-.172-.688.172 1.203c.344 1.89.344 5.673 1.032 7.22.687 1.547 2.578 5.5 4.297 7.392 1.72 1.89 3.954 5.157 3.954 5.157z"
      ></Path>
      <Path
        fill="url(#radialGradient3439)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M118.273 287.995s-5.501-7.048-6.36-8.423c-.86-1.375-1.72-1.89-.689.86s6.189 8.938 6.189 8.938z"
      ></Path>
      <Path
        fill="url(#linearGradient3486)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M405.664 309.655s-19.532-17.652-27.037-16.714c-7.506.94-9.042-5.798-.427-3.411s23.54 10.915 27.464 20.125"
      ></Path>
      <Path
        fill="#bdd1e0"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M126.146 236.131a27 27 0 0 0-4.843.407c-6.072 1.071-14.875 9.156-14.875 9.156a3.7 3.7 0 0 1 0 1.75c3.837-3.504 11.677-9.758 18.28-9.25 9.105.7 14.707 7.336 15.407 11.187.7 3.852 3.148 12.258-8.406 25.563S83.74 319.05 81.99 320.1c-1.641.985-6.99 4.453-9.094 3.438.18 1.013.432 1.776.813 2.093 2.143 1.786 3.99.148 7.562-1.28 3.572-1.43 12.069-7.002 24.313-17.938 12.796-11.429 34.622-32.64 39.25-45.282 2.727-7.449-2.147-16.089-5.719-20.375-2.678-3.214-7.942-4.592-12.969-4.625"
      ></Path>
      <Path
        fill="url(#radialGradient3510)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M126.146 236.131a27 27 0 0 0-4.843.407c-6.072 1.071-14.875 9.156-14.875 9.156a3.7 3.7 0 0 1 0 1.75c3.837-3.504 11.677-9.758 18.28-9.25 9.105.7 14.707 7.336 15.407 11.187.7 3.852 3.148 12.258-8.406 25.563S83.74 319.05 81.99 320.1c-1.641.985-6.99 4.453-9.094 3.438.18 1.013.432 1.776.813 2.093 2.143 1.786 3.99.148 7.562-1.28 3.572-1.43 12.069-7.002 24.313-17.938 12.796-11.429 34.622-32.64 39.25-45.282 2.727-7.449-2.147-16.089-5.719-20.375-2.678-3.214-7.942-4.592-12.969-4.625"
        opacity="0.742"
      ></Path>
      <Path
        fill="url(#radialGradient3521)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M126.146 236.131a27 27 0 0 0-4.843.407c-6.072 1.071-14.875 9.156-14.875 9.156a3.7 3.7 0 0 1 0 1.75c3.837-3.504 11.677-9.758 18.28-9.25 9.105.7 14.707 7.336 15.407 11.187.7 3.852 3.148 12.258-8.406 25.563S83.74 319.05 81.99 320.1c-1.641.985-6.99 4.453-9.094 3.438.18 1.013.432 1.776.813 2.093 2.143 1.786 3.99.148 7.562-1.28 3.572-1.43 12.069-7.002 24.313-17.938 12.796-11.429 34.622-32.64 39.25-45.282 2.727-7.449-2.147-16.089-5.719-20.375-2.678-3.214-7.942-4.592-12.969-4.625"
      ></Path>
      <Path
        fill="url(#radialGradient3525)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M126.146 236.131a27 27 0 0 0-4.843.407c-6.072 1.071-14.875 9.156-14.875 9.156a3.7 3.7 0 0 1 0 1.75c3.837-3.504 11.677-9.758 18.28-9.25 9.105.7 14.707 7.336 15.407 11.187.7 3.852 3.148 12.258-8.406 25.563S83.74 319.05 81.99 320.1c-1.641.985-6.99 4.453-9.094 3.438.18 1.013.432 1.776.813 2.093 2.143 1.786 3.99.148 7.562-1.28 3.572-1.43 12.069-7.002 24.313-17.938 12.796-11.429 34.622-32.64 39.25-45.282 2.727-7.449-2.147-16.089-5.719-20.375-2.678-3.214-7.942-4.592-12.969-4.625"
      ></Path>
      <Path
        fill="url(#linearGradient3535)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M106.24 248.286s5.844-5.501 8.938-7.22c3.094-1.72 7.22-2.75 10.658-2.407 3.438.344 10.314 3.782 10.314 3.782s-8.595-3.094-11.345-2.75-12.377 5.157-16.503 9.282c-4.126 4.126-2.063-.344-2.063-.687"
      ></Path>
      <Path
        fill="url(#linearGradient3545)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M71.859 321.516s-1.72 3.782 4.813 2.75c6.532-1.03 22.691-12.72 22.691-12.72s-15.815 13.752-22.347 15.127-4.814-4.125-5.157-5.157"
      ></Path>
      <Path
        fill="url(#linearGradient3555)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M77.36 326.33s-3.439-22.004-1.72-30.255c1.72-8.252-6.188 18.91-2.75 28.192 2.75 2.406 4.47 2.75 4.47 2.063"
      ></Path>
    </G>
    <G strokeLinejoin="miter">
      <Path
        fill="url(#radialGradient4204)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="url(#linearGradient3519)"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeOpacity="1"
        strokeWidth="1.169"
        d="M430.195 499.405a19.147 9.947 0 1 1-38.295 0 19.147 9.947 0 1 1 38.295 0z"
        opacity="0.804"
        transform="matrix(.85336 .208 -.16483 1.07687 66.696 -221.297)"
      ></Path>
      <Path
        fill="#17110e"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m586.056 360.716 142.735-80.071 1.99 4.476-137.265 79.076-8.952 6.963z"
      ></Path>
      <Path
        fill="#9ab1bf"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m585.995 359.952 6.526 4.743 137.762-79.574-1.492-4.476z"
      ></Path>
      <Path
        fill="url(#linearGradient3963)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m585.995 359.952 6.526 4.743 137.762-79.574-1.492-4.476z"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="url(#linearGradient3973)"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m588.029 361.25 4.923 3.867 122.03-71.037"
      ></Path>
      <Path
        fill="url(#linearGradient3992)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m605.431 273.088 9.107-3.52s2.33 20.566 2.437 26.578c.108 6.013.804 21.912.804 21.912l-9.082-4.647s-1.347-32.516-3.266-40.323"
        opacity="0.754"
      ></Path>
      <Path
        fill="url(#linearGradient3996)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m605.431 273.088 9.107-3.52s2.33 20.566 2.437 26.578c.108 6.013.804 21.912.804 21.912l-9.082-4.647s-1.347-32.516-3.266-40.323"
        opacity="1"
      ></Path>
      <Path
        fill="url(#linearGradient4006)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m611.827 321.053 6.445-3.204-9.126-3.93s-.745 4.279 2.681 7.134"
        opacity="0.642"
      ></Path>
      <G
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        transform="scale(.94944)rotate(3.547 2062.874 -411.457)"
      >
        <Path
          fill="url(#linearGradient4026)"
          d="m695.502 369.65 9.2-4.227s3.73 21.137 4.228 27.354 2.238 22.629 2.238 22.629l-9.698-4.228s-3.481-33.57-5.968-41.527"
          opacity="0.754"
        ></Path>
        <Path
          fill="url(#linearGradient4028)"
          d="m695.502 369.65 9.2-4.227s3.73 21.137 4.228 27.354 2.238 22.629 2.238 22.629l-9.698-4.228s-3.481-33.57-5.968-41.527"
          opacity="1"
        ></Path>
        <Path
          fill="url(#linearGradient4030)"
          d="m705.2 418.887 6.465-3.73-9.698-3.481s-.497 4.476 3.233 7.211"
          opacity="0.642"
        ></Path>
      </G>
      <Path
        fill="url(#linearGradient4047)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m628.5 265.256 8.537-3.3s2.183 19.28 2.284 24.916c.101 5.637.754 20.542.754 20.542l-8.514-4.357s-1.263-30.482-3.062-37.8"
        opacity="0.754"
      ></Path>
      <Path
        fill="url(#linearGradient4049)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m628.5 265.256 8.537-3.3s2.183 19.28 2.284 24.916c.101 5.637.754 20.542.754 20.542l-8.514-4.357s-1.263-30.482-3.062-37.8"
        opacity="1"
      ></Path>
      <Path
        fill="url(#linearGradient4051)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m634.496 310.22 6.041-3.003-8.555-3.683s-.699 4.01 2.514 6.687"
        opacity="0.642"
      ></Path>
      <G
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        transform="rotate(3.549 1719.854 622.237)scale(.89005)"
      >
        <Path
          fill="url(#linearGradient4053)"
          d="m695.502 369.65 9.2-4.227s3.73 21.137 4.228 27.354 2.238 22.629 2.238 22.629l-9.698-4.228s-3.481-33.57-5.968-41.527"
          opacity="0.754"
        ></Path>
        <Path
          fill="url(#linearGradient4055)"
          d="m695.502 369.65 9.2-4.227s3.73 21.137 4.228 27.354 2.238 22.629 2.238 22.629l-9.698-4.228s-3.481-33.57-5.968-41.527"
          opacity="1"
        ></Path>
        <Path
          fill="url(#linearGradient4057)"
          d="m705.2 418.887 6.465-3.73-9.698-3.481s-.497 4.476 3.233 7.211"
          opacity="0.642"
        ></Path>
      </G>
      <Path
        fill="#331409"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="#dade7b"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeOpacity="0.523"
        strokeWidth="2.069"
        d="M464.067 316.443c1.053 3.452-8.617 9.374-15.89 11.593s-9.408-.103-10.46-3.555-.628-6.732 6.645-8.95c7.273-2.22 18.653-2.54 19.705.912z"
        opacity="0.642"
      ></Path>
      <Path
        fill="url(#radialGradient4119)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="#232408"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeOpacity="0.776"
        strokeWidth="1.039"
        d="M462.747 316.931c.95 3.023-7.778 8.21-14.342 10.153s-8.49-.09-9.44-3.113-.567-5.897 5.997-7.84c6.565-1.943 16.835-2.223 17.785.8z"
        opacity="0.804"
      ></Path>
      <Path
        fill="url(#radialGradient4123)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeOpacity="0.776"
        strokeWidth="1.039"
        d="M462.747 316.931c.95 3.023-7.778 8.21-14.342 10.153s-8.49-.09-9.44-3.113-.567-5.897 5.997-7.84c6.565-1.943 16.835-2.223 17.785.8"
        opacity="0.804"
      ></Path>
      <Path
        fill="url(#linearGradient4075)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="url(#linearGradient4067)"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m625.657 318.697.352 4.923 14.418-7.736.352-4.22z"
      ></Path>
      <Path
        fill="url(#radialGradient4157)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="url(#linearGradient4149)"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeOpacity="1"
        strokeWidth="1.169"
        d="M430.195 499.405a19.147 9.947 0 1 1-38.295 0 19.147 9.947 0 1 1 38.295 0z"
        opacity="0.804"
        transform="matrix(.85336 .208 -.16483 1.07687 66.696 -221.297)"
      ></Path>
      <Path
        fill="url(#linearGradient4250)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeOpacity="1"
        strokeWidth="1.169"
        d="M422.735 500.151a8.703 11.687 0 1 1-17.406 0 8.703 11.687 0 1 1 17.406 0"
        opacity="1"
        transform="matrix(.99543 -.14307 .11865 .82551 -135.58 48.917)"
      ></Path>
      <Path
        fill="#2f2728"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="M336.646 393.016s8.704 1.236 10.149 3.87 2.789 4.573 2.543 7.806-9.592 7.419-9.592 7.419 6.807-7.019 5.063-11.742-8.213-7.701-8.163-7.353"
        opacity="1"
      ></Path>
      <Path
        fill="url(#radialGradient4198)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="M336.646 393.016s8.704 1.236 10.149 3.87 2.789 4.573 2.543 7.806-9.592 7.419-9.592 7.419 5.015-5.505 3.27-10.228-6.42-9.215-6.37-8.867"
        opacity="0.521"
      ></Path>
      <Path
        fill="#251f20"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeOpacity="1"
        strokeWidth="1.169"
        d="M422.735 500.151a8.703 11.687 0 1 1-17.406 0 8.703 11.687 0 1 1 17.406 0"
        opacity="1"
        transform="matrix(.99543 -.14307 .11865 .82551 -135.58 48.917)"
      ></Path>
      <Path
        fill="url(#linearGradient4188)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeOpacity="1"
        strokeWidth="1.169"
        d="M422.735 500.151a8.703 11.687 0 1 1-17.406 0 8.703 11.687 0 1 1 17.406 0"
        opacity="1"
        transform="matrix(.99543 -.14307 .11865 .82551 -135.58 48.917)"
      ></Path>
      <Path
        fill="url(#radialGradient4218)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeOpacity="1"
        strokeWidth="1.169"
        d="M415.275 502.762a4.849 6.59 0 1 1-9.698 0 4.849 6.59 0 1 1 9.698 0"
        opacity="1"
        transform="rotate(-8.179 -328.492 997.505)"
      ></Path>
      <Path
        fill="url(#radialGradient4228)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeOpacity="1"
        strokeWidth="1.169"
        d="M415.275 502.762a4.849 6.59 0 1 1-9.698 0 4.849 6.59 0 1 1 9.698 0"
        opacity="1"
        transform="rotate(-8.179 -328.492 997.505)"
      ></Path>
      <Path
        fill="url(#radialGradient4238)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeOpacity="1"
        strokeWidth="1.169"
        d="M415.275 502.762a4.849 6.59 0 1 1-9.698 0 4.849 6.59 0 1 1 9.698 0"
        opacity="1"
        transform="rotate(-8.179 -328.492 997.505)"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="0.531"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="M331.668 390.556s9.698 1.492 13.18 4.476 6.714 7.46 6.216 11.439c-.497 3.979-5.719 5.47-9.2 6.217-3.482.746-8.206-.498-8.206-.498s6.714.249 11.19-2.486 6.216-6.466 3.232-9.947c-2.984-3.482-5.968-6.217-10.444-6.466-4.476-.248-8.454-.994-5.968-2.735"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m735.115 187.288-1.062.125c.402.117.375.148 0 .28-.432.126-.898.2-1.344.25-.063.013-.125.019-.188.032-.538-.095-1.618.024-1.625-.031-.375.061-.59.151-.656.25-.061.02-.129.036-.187.062-.034.028-.041.04-.063.063-.39.115-.77.275-1.156.406a6.2 6.2 0 0 0-1.375.563c.712.424 1.67.114 2.437-.094.282-.078.564-.137.844-.219.006.01-.006.022 0 .031.737.454 1.601.34 2.438.282.77-.04.399-.528-.032-.75a.6.6 0 0 0 .188-.22c.111-.039.229-.085.344-.124l-.282-.031c.127-.027.244-.048.375-.063a7.4 7.4 0 0 0 1.313-.281c.456-.107.412-.34.031-.531m-2.625 1.625c.087.092.103.178-.094.218-.036-.002-.022.004-.062 0 .018-.008.017-.045.031-.062.06-.04.093-.1.125-.156"
        color="#000"
        opacity="0.809"
        visibility="visible"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="0.129"
        d="M722.464 193.341s-4.721-.352.284-3.082c5.134-2.8 5.567-1.073 7.3-2.255 2.502-1.706 4.384-.97 5.542 1.513.796 1.706-1.386.723-4.23.95-4.518.362-1.202-.63-4.273 1.077-3.433 1.907-3.6 2.707-4.623 1.797"
        opacity="0.483"
      ></Path>
      <Path
        fill="#3f5b8b"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="M722.015 191.657s-.176-1.935 3.692-4.045c3.969-2.164 3.408-1.812 4.748-2.725 1.934-1.319 4.204-1.215 5.099.703.615 1.319-.528 2.11-2.726 2.286-3.492.28-2.989.44-5.362 1.758-2.654 1.475-4.66 2.726-5.451 2.023"
      ></Path>
      <Path
        fill="url(#linearGradient4318)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="M722.015 191.657s-.176-1.935 3.692-4.045c3.969-2.164 3.408-1.812 4.748-2.725 1.934-1.319 4.204-1.215 5.099.703.615 1.319-.528 2.11-2.726 2.286-3.492.28-2.989.44-5.362 1.758-2.654 1.475-4.66 2.726-5.451 2.023"
      ></Path>
      <Path
        fill="none"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="url(#linearGradient4408)"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="0.1"
        d="M722.015 191.657s-.176-1.935 3.692-4.045c3.969-2.164 3.408-1.812 4.748-2.725 1.934-1.319 4.204-1.215 5.099.703.615 1.319-.528 2.11-2.726 2.286-3.492.28-2.989.44-5.362 1.758-2.654 1.475-4.66 2.726-5.451 2.023z"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="0.1"
        d="M438.496 326.802c.274.711.833 1.105 1.507 1.392.805.29 1.65.462 2.481.661 1.351.368 2.71.324 4.08.115 1.825-.44 4-1.578 5.996-2.569 2.395-1.188 4.757-2.437 7.054-3.804 1.259-.783 3.568-4.462 4.765-5.243l-1.584 3.887c-1.217.788-.594.393-1.872 1.183-2.314 1.369-4.692 3.252-7.102 4.445-2.734 1.364-5.593 2.941-8.633 3.485-1.4.206-2.684-.6-4.064-.972-.849-.196-.532-.654-1.347-.968-.708-.326-.93-1.375-1.254-2.103z"
        color="#000"
        opacity="1"
        visibility="visible"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="M730.344 185.372c-.415.19-2.925 1.428-3.323 1.653-.413.22-.78.507-1.134.808-.332.313-.668.616-1.049.868-.387.245-.782.461-1.107.787-.298.31-.453.71-.594 1.108-.13.253-.065.128-.195.374l-1.066-.052c.129-.242.064-.122.194-.359.148-.41.301-.826.604-1.152.323-.344.707-.574 1.113-.81.379-.25.717-.547 1.052-.852a5.4 5.4 0 0 1 1.128-.832c.397-.23.808-.429 1.229-.613z"
        color="#000"
        opacity="1"
        visibility="visible"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="0.531"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="M72.833 335.929s4.22 9.143 4.572 10.902c.351 1.758-4.924 0-5.627-3.165s.703-6.682 1.055-7.737"
      ></Path>
      <Path
        fill="url(#radialGradient4264)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="M72.833 335.929s4.22 9.143 4.572 10.902c.351 1.758-4.924 0-5.627-3.165s.703-6.682 1.055-7.737"
      ></Path>
      <Path
        fill="#728c8c"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="M178.738 376.88s2.984 1.491 3.73 2.983 4.476 5.222 4.476 5.222l5.719 4.974s-1.243 4.476-2.984 3.481-3.233-4.476-4.725-5.47c-1.492-.995-4.227-3.482-5.222-4.228-.994-.746-3.232-.995-3.73-2.984-.497-1.99.249-4.476 2.736-3.979"
        opacity="1"
      ></Path>
      <Path
        fill="url(#linearGradient4193)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="M178.738 376.88s2.984 1.491 3.73 2.983 4.476 5.222 4.476 5.222l5.719 4.974s-1.243 4.476-2.984 3.481-3.233-4.476-4.725-5.47c-1.492-.995-4.227-3.482-5.222-4.228-.994-.746-3.232-.995-3.73-2.984-.497-1.99.249-4.476 2.736-3.979"
        opacity="1"
      ></Path>
      <Path
        fill="url(#linearGradient4197)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="M178.738 376.88s2.984 1.491 3.73 2.983 4.476 5.222 4.476 5.222l5.719 4.974s-1.243 4.476-2.984 3.481-3.233-4.476-4.725-5.47c-1.492-.995-4.227-3.482-5.222-4.228-.994-.746-3.232-.995-3.73-2.984-.497-1.99.249-4.476 2.736-3.979"
        opacity="1"
      ></Path>
      <Path
        fill="url(#linearGradient4201)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="M178.738 376.88s2.984 1.491 3.73 2.983 4.476 5.222 4.476 5.222l5.719 4.974s-1.243 4.476-2.984 3.481-3.233-4.476-4.725-5.47c-1.492-.995-4.227-3.482-5.222-4.228-.994-.746-3.232-.995-3.73-2.984-.497-1.99.249-4.476 2.736-3.979"
        opacity="1"
      ></Path>
      <Path
        fill="#c4d3ac"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="url(#linearGradient4135)"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m179.732 319.437 10.942-11.936 7.46.497-10.942 13.428z"
      ></Path>
      <Path
        fill="url(#linearGradient4153)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="url(#linearGradient4145)"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m179.732 319.437 10.942-11.936 7.46.497-10.942 13.428z"
      ></Path>
      <Path
        fill="url(#linearGradient5358)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="m179.732 319.437 10.942-11.936 7.46.497-10.942 13.428z"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="2"
        d="M185.97 312.678c-.6.394-3.508 4.548-4.02 5.047-.49.482-.952.99-1.369 1.537-.612.29.323.302.3.298-1.07-.16-.78-.007-.213-.221.839-.243 1.518-.127 2.335.151-.243.935-2.124.068-.638-.133 1.008-.334 1.591.245 2.43.473.38.428 1.007.35 1.392.726.166.407.44.712.75 1.014l-1.027.082a3.9 3.9 0 0 1-.75-1.009c-.404-.315-1.214.122-1.607-.248-1.82-.581.734-.844-.163-.886-.473.029-2.181.765-1.413-.029 2.302-.42.232-.01-.298-.02-.63.265-2.497.69-2.128-.267.439-.542.915-1.051 1.407-1.547.506-.506 1.029-.998 1.624-1.4z"
        color="#000"
        opacity="1"
        visibility="visible"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="2"
        d="M191.996 315.262c.372-.46.744-.918 1.098-1.391a46 46 0 0 1 1.7-2.118c.457-.526.903-1.061 1.373-1.575.348-.37.707-.73 1.065-1.092.32-.321.562-.692.774-1.088-1.25-.41.612-.295-.41-.07-.504.126-1.023.163-1.54.194-.852.032-1.708.067-2.557-.026-.091-.012-2.99-.816-3.082-.828l3.82.644.287.033c1.146.087-1.066.037.517.022.512-.027 1.029-.055 1.529-.178.782-.18 2.008-.544 2.47.254a3.8 3.8 0 0 1-.793 1.12c-.34.376-.709.725-1.06 1.092-.483.509-.94 1.042-1.405 1.568-.59.68-1.159 1.379-1.682 2.112-.345.476-5.387 5.908-5.756 6.366z"
        color="#000"
        opacity="1"
        visibility="visible"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="M186.883 313.758c.288 2.952 0 3.24 0 3.24l5.4-6.336z"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeOpacity="1"
        strokeWidth="1"
        d="M190.05 315.414c-2.375 1.296-3.167 1.584-3.167 1.584.4-2.252 3.203-4.264 5.4-6.336z"
      ></Path>
    </G>
    <Path
      fill="url(#radialGradient4306)"
      fillOpacity="1"
      fillRule="nonzero"
      stroke="none"
      strokeDasharray="none"
      strokeLinecap="round"
      strokeLinejoin="miter"
      strokeOpacity="1"
      strokeWidth="1.169"
      d="M421.74 498.162a1.492 2.238 0 1 1-2.983 0 1.492 2.238 0 1 1 2.984 0"
      opacity="0.729"
      transform="rotate(-44.31 256.677 543.417)"
    ></Path>
    <G strokeLinejoin="miter" strokeOpacity="1">
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M87.77 346.242s16.195 4.824 25.702 7.581c9.506 2.757 32.392 9.993 44.363 13.094 11.972 3.102 67.25 13.44 83.798 16.196s34.505 6.202 42.251 16.54 9.155 15.506 8.803 18.263c-.353 2.757-1.057 9.304-8.099 9.993s-47.18-1.378-82.037-11.027-64.609-18.435-87.319-32.219c-14.856-9.016-26.054-21.191-29.223-28.428-3.169-7.236.176-11.199 1.76-9.993"
        opacity="1"
      ></Path>
      <Path
        fill="url(#radialGradient3309)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M103.839 352.543s11.884 17.826 20.797 20.797 21.788 10.894 50.012 18.321c28.225 7.428 80.218 19.807 91.607 21.293 11.39 1.485 25.254 3.466 25.254 3.466s4.457 4.952-8.418 8.418c-4.992 1.344-65.363-8.418-65.363-8.418s-54.469-13.865-73.285-20.797c-18.817-6.933-31.126-13.13-40.604-20.302-9.161-6.933-15.846-17.331-15.846-17.331s-7.923-10.894-4.456-11.39c3.466-.495 20.797 5.943 20.302 5.943"
        opacity="1"
      ></Path>
      <Path
        fill="url(#linearGradient4062)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1.8"
        d="m108.115 353.444-.937 1.531s1.208.694 3.406 1.844l1.562 3.469c-.202-.117-.875-.5-.875-.5l-.906 1.53s1.048.598 3 1.626l1.125 2.5-.062-.031-.907 1.53s.948.52 2.188 1.188l.625 1.407.906-.407-.094-.25c1.612.837 3.676 1.898 6.438 3.188l.125.281.25-.125c5.519 2.565 13.298 5.92 23.406 9.625l.656 1.094.844-.5-.031-.063c2.217.803 4.502 1.606 6.937 2.438 1.686.576 3.428 1.163 5.22 1.75l1.062 2 .906-.469-.563-1.062c4.086 1.323 8.467 2.644 13.094 4l1.25 2.5 1.063-.563-.75-1.469a549 549 0 0 0 14.28 3.907l1.97 3.406 1.03-.594-1.374-2.406c5.228 1.345 10.72 2.714 16.5 4.031l1.594 2.938 1.406-.782-.906-1.687a675 675 0 0 0 17.406 3.656l1 2.281 1.562-.687-.53-1.219c4.763.924 9.673 1.873 14.75 2.75l1.062 2.969 1.625-.563-.75-2.062c4.954.843 10.092 1.619 15.343 2.406l.344 1.188 1.531-.407-.156-.53c4.93.728 9.965 1.453 15.156 2.124l.938 2.781 1.781-.593-.656-1.938c2.677.34 5.347.677 8.094 1l.218-1.781c-3.036-.357-5.986-.748-8.937-1.125l-1.188-3.563c2.243.281 4.46.575 6.75.844l.22-1.781c-2.58-.303-5.077-.62-7.595-.938l-1.406-4.28c1.875.232 3.717.462 5.625.687l.188-1.782c-2.187-.257-4.295-.544-6.438-.812l-1.187-3.531-1.813.593.906 2.688a848 848 0 0 1-14.406-1.969l-1.312-4.656c3.604.525 7.258 1.036 11 1.531l.25-1.781c-37.017-4.897-67.261-11.331-91.188-17.813l-.469 1.72c.454.122.948.251 1.407.374l-.407.219 2.782 4.781c-4.601-1.22-8.97-2.44-13.125-3.656l-2.657-5.219-1.062.563 2.125 4.187a475 475 0 0 1-13.469-4.219l-1.75-3.312-.906.469 1.25 2.406c-1.154-.384-2.33-.778-3.438-1.156a401 401 0 0 1-9.687-3.438l-1.656-2.844-.875.5 1.03 1.782a339 339 0 0 1-8.062-3.157l-1.218-2.28-.907.468.657 1.219a262 262 0 0 1-10.407-4.532l-.593-1.343-.907.406.125.312c-6.28-2.957-9.406-4.812-9.406-4.812m3.938 4.125c1.719.873 3.883 1.954 6.562 3.187l1.594 3.594c-2.938-1.393-5.107-2.471-6.563-3.25zm7.937 3.812a269 269 0 0 0 10.656 4.563l2.094 3.937a267 267 0 0 1-11.156-4.843zm-5.187 2.313c1.69.865 3.778 1.898 6.5 3.156l1.187 2.719c-3.495-1.68-5.36-2.66-6.531-3.313zm17.28 2.812a355 355 0 0 0 8.188 3.125l2.407 4.125a345 345 0 0 1-8.47-3.28zm-9.405.97a273 273 0 0 0 11.406 4.874l1.656 3.063c-4.789-1.965-8.701-3.679-11.844-5.157zm19.062 2.687c2.444.89 4.974 1.792 7.688 2.718 1.707.583 3.465 1.187 5.28 1.782l2.157 4.062c-1.24-.41-2.5-.813-3.687-1.219a403 403 0 0 1-9.032-3.187zm-6.219 2.75c2.64 1.046 5.49 2.122 8.563 3.25l1.906 3.28a339 339 0 0 1-8.812-3.437zm20.594 2.187a487 487 0 0 0 13.344 4.094l2.094 4.156a473 473 0 0 1-13.282-4.156zm25.563 1.25a589 589 0 0 0 17.5 4.375l2.718 5.031a604 604 0 0 1-17.218-4.218zm-36.125.375c2.244.813 4.561 1.626 7.03 2.469 1.778.607 3.607 1.225 5.5 1.844l1.72 3.25c-1.164-.387-2.352-.775-3.47-1.157a400 400 0 0 1-8.905-3.156zm25.5 2.938a549 549 0 0 0 13.25 3.625l2.5 4.312a535 535 0 0 1-13.657-3.812zm30.187 1.53a664 664 0 0 0 19.688 4.22l2.093 4.875a668 668 0 0 1-19.062-4.063zm-41.781.282a486 486 0 0 0 13.219 4.063l1.687 3.343c-4.692-1.39-9.07-2.804-13.187-4.156zm26.469 2.25a608 608 0 0 0 17.093 4.156l2.313 4.282a600 600 0 0 1-16.906-4.157zm37.03 2.094a733 733 0 0 0 16.345 3.031l1.656 4.75a731 731 0 0 1-15.906-2.906zm-48.687.156a548 548 0 0 0 13.782 3.781l2.03 3.5a536 536 0 0 1-14.124-3.937zm30.844 2.375a680 680 0 0 0 18.781 3.938l1.844 4.218a671 671 0 0 1-18.312-3.875zm36.094.813c5.409.917 10.989 1.804 16.75 2.656l1.312 4.656a794 794 0 0 1-16.375-2.562zm-51.531 1.03a610 610 0 0 0 16.78 4.063l1.876 3.5a600 600 0 0 1-16.656-4.093zm36.25 2.47c5.075.974 10.293 1.954 15.718 2.875l1.5 4.187a737 737 0 0 1-15.375-2.812zm-17.375 2.062a679 679 0 0 0 18.03 3.781l1.532 3.5a667 667 0 0 1-17.687-3.78zm35.03 1.125a799 799 0 0 0 16.22 2.531l1.187 4.188c-5.453-.812-10.771-1.629-15.906-2.5zm17.938 2.781c4.705.677 9.563 1.314 14.5 1.938l1.438 4.281a845 845 0 0 1-14.75-2.031zm-32.906.25c4.921.948 9.968 1.915 15.219 2.813l1.219 3.437a735 735 0 0 1-14.907-2.75zm17.156 3.125a799 799 0 0 0 15.75 2.47l.97 3.468c-5.31-.801-10.498-1.611-15.5-2.469zm17.47 2.72a849 849 0 0 0 14.843 2.03l1.187 3.563a838 838 0 0 1-15.062-2.094z"
      ></Path>
      <Path
        fill="url(#linearGradient4070)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1.8"
        d="m108.818 352.74-.937 1.532s1.208.694 3.406 1.844l1.563 3.468-.875-.5-.907 1.532s1.049.597 3 1.625l1.125 2.5-.062-.032-.906 1.532s.948.518 2.187 1.187l.625 1.406.906-.406-.093-.25c1.61.837 3.675 1.897 6.437 3.188l.125.28.25-.124c5.52 2.564 13.298 5.92 23.406 9.625l.657 1.094.843-.5-.03-.063c2.216.802 4.502 1.606 6.937 2.438 1.686.575 3.427 1.163 5.218 1.75l1.063 2 .906-.47-.562-1.062c4.086 1.324 8.467 2.644 13.093 4l1.25 2.5 1.063-.562-.75-1.469a549 549 0 0 0 14.281 3.906l1.969 3.407 1.031-.594-1.375-2.406c5.228 1.345 10.72 2.714 16.5 4.03l1.594 2.938 1.406-.781-.906-1.687a675 675 0 0 0 17.406 3.656l1 2.281 1.563-.687-.532-1.22c4.765.924 9.674 1.874 14.75 2.75l1.063 2.97 1.625-.563-.75-2.062c4.955.842 10.093 1.618 15.344 2.406l.343 1.187 1.532-.406-.157-.531c4.93.729 9.965 1.454 15.157 2.125l.937 2.781 1.781-.594-.656-1.937c2.678.34 5.347.677 8.094 1l.219-1.781c-3.036-.357-5.987-.748-8.938-1.125l-1.187-3.563c2.243.281 4.459.575 6.75.844l.218-1.781c-2.578-.303-5.076-.62-7.593-.938l-1.407-4.281c1.876.232 3.717.463 5.625.687l.188-1.781c-2.187-.257-4.295-.545-6.438-.812l-1.187-3.532-1.813.594.907 2.688a848 848 0 0 1-14.407-1.97l-1.312-4.655c3.604.525 7.258 1.036 11 1.53l.25-1.78c-37.017-4.897-67.26-11.331-91.188-17.813l-.468 1.719c.453.123.948.252 1.406.375l-.406.219 2.781 4.78c-4.6-1.22-8.969-2.439-13.125-3.655l-2.656-5.22-1.063.563 2.125 4.188a475 475 0 0 1-13.469-4.219l-1.75-3.312-.906.468 1.25 2.407c-1.154-.384-2.33-.778-3.437-1.157a401 401 0 0 1-9.688-3.437l-1.656-2.844-.875.5 1.031 1.781a339 339 0 0 1-8.062-3.156l-1.219-2.281-.906.469.656 1.218a262 262 0 0 1-10.406-4.531l-.594-1.344-.906.407.125.312c-6.281-2.957-9.407-4.812-9.407-4.812m3.938 4.126c1.719.873 3.884 1.954 6.562 3.187l1.594 3.594c-2.938-1.393-5.106-2.472-6.562-3.25zm7.937 3.812a269 269 0 0 0 10.657 4.563l2.093 3.937a267 267 0 0 1-11.156-4.844zm-5.187 2.313c1.69.865 3.778 1.897 6.5 3.156l1.187 2.719c-3.494-1.68-5.359-2.66-6.53-3.313zm17.281 2.812a355 355 0 0 0 8.188 3.125l2.406 4.125a345 345 0 0 1-8.469-3.281zm-9.406.969a273 273 0 0 0 11.406 4.875l1.656 3.062c-4.788-1.964-8.701-3.678-11.843-5.156zm19.062 2.687c2.444.89 4.974 1.792 7.688 2.719 1.707.583 3.466 1.187 5.281 1.781l2.156 4.063c-1.239-.411-2.5-.814-3.687-1.219a403 403 0 0 1-9.031-3.187zm-6.218 2.75c2.64 1.047 5.49 2.123 8.562 3.25l1.906 3.282a339 339 0 0 1-8.812-3.438zm20.593 2.188a487 487 0 0 0 13.344 4.094l2.094 4.156a473 473 0 0 1-13.281-4.156zm25.563 1.25a589 589 0 0 0 17.5 4.375l2.719 5.031a604 604 0 0 1-17.219-4.219zm-36.125.375c2.245.813 4.562 1.625 7.031 2.469 1.777.606 3.606 1.224 5.5 1.843l1.719 3.25c-1.164-.386-2.352-.774-3.469-1.156a400 400 0 0 1-8.906-3.156zm25.5 2.937a549 549 0 0 0 13.25 3.625l2.5 4.313a535 535 0 0 1-13.656-3.813zm30.187 1.532a664 664 0 0 0 19.688 4.218l2.094 4.875a668 668 0 0 1-19.063-4.062zm-41.78.28a486 486 0 0 0 13.218 4.063l1.687 3.344c-4.691-1.39-9.07-2.804-13.187-4.156zm26.468 2.25a608 608 0 0 0 17.094 4.157l2.312 4.281a600 600 0 0 1-16.906-4.156zm37.031 2.095a733 733 0 0 0 16.344 3.03l1.656 4.75a731 731 0 0 1-15.906-2.905zm-48.687.156a548 548 0 0 0 13.781 3.781l2.031 3.5a536 536 0 0 1-14.125-3.937zm30.843 2.375a680 680 0 0 0 18.782 3.937l1.843 4.219a671 671 0 0 1-18.312-3.875zm36.094.812q8.112 1.378 16.75 2.657l1.313 4.656a794 794 0 0 1-16.375-2.563zm-51.531 1.032a610 610 0 0 0 16.781 4.062l1.875 3.5a600 600 0 0 1-16.656-4.094zm36.25 2.468c5.075.975 10.294 1.955 15.719 2.875l1.5 4.188a737 737 0 0 1-15.375-2.813zm-17.375 2.063a679 679 0 0 0 18.031 3.781l1.531 3.5a667 667 0 0 1-17.687-3.781zm35.031 1.125a799 799 0 0 0 16.219 2.531l1.187 4.188c-5.453-.812-10.771-1.63-15.906-2.5zm17.938 2.781c4.704.677 9.562 1.313 14.5 1.938l1.437 4.28a845 845 0 0 1-14.75-2.03zm-32.907.25c4.921.948 9.968 1.915 15.22 2.813l1.218 3.437a735 735 0 0 1-14.906-2.75zm17.157 3.125a799 799 0 0 0 15.75 2.469l.968 3.469c-5.308-.802-10.497-1.612-15.5-2.47zm17.468 2.719a849 849 0 0 0 14.844 2.031l1.188 3.563a838 838 0 0 1-15.063-2.094z"
        opacity="0.529"
      ></Path>
      <Path
        fill="#2c3339"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M103.839 352.543s11.884 17.826 20.797 20.797 21.788 10.894 50.012 18.321c28.225 7.428 80.218 19.807 91.607 21.293 11.39 1.485 25.254 3.466 25.254 3.466s4.457 4.952-8.418 8.418c-4.992 1.344-65.363-8.418-65.363-8.418s-54.469-13.865-73.285-20.797c-18.817-6.933-31.126-13.13-40.604-20.302-9.161-6.933-15.846-17.331-15.846-17.331s-7.923-10.894-4.456-11.39c3.466-.495 20.797 5.943 20.302 5.943"
        opacity="1"
      ></Path>
      <Path
        fill="url(#radialGradient4120)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M103.839 352.543s11.884 17.826 20.797 20.797 21.788 10.894 50.012 18.321c28.225 7.428 80.218 19.807 91.607 21.293 11.39 1.485 25.254 3.466 25.254 3.466s4.457 4.952-8.418 8.418c-4.992 1.344-65.363-8.418-65.363-8.418s-54.469-13.865-73.285-20.797c-18.817-6.933-31.126-13.13-40.604-20.302-9.161-6.933-15.846-17.331-15.846-17.331s-7.923-10.894-4.456-11.39c3.466-.495 20.797 5.943 20.302 5.943"
        opacity="0.567"
      ></Path>
      <Path
        fill="url(#linearGradient3295)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M103.839 352.543s11.884 17.826 20.797 20.797 21.788 10.894 50.012 18.321c28.225 7.428 80.218 19.807 91.607 21.293 11.39 1.485 25.254 3.466 25.254 3.466s4.457 4.952-8.418 8.418c-4.992 1.344-65.363-8.418-65.363-8.418s-54.469-13.865-73.285-20.797c-18.817-6.933-31.126-13.13-40.604-20.302-9.161-6.933-15.846-17.331-15.846-17.331s-7.923-10.894-4.456-11.39c3.466-.495 20.797 5.943 20.302 5.943"
        opacity="1"
      ></Path>
      <Path
        fill="url(#radialGradient3299)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M103.839 352.543s11.884 17.826 20.797 20.797 21.788 10.894 50.012 18.321c28.225 7.428 80.218 19.807 91.607 21.293 11.39 1.485 25.254 3.466 25.254 3.466s4.457 4.952-8.418 8.418c-4.992 1.344-65.363-8.418-65.363-8.418s-54.469-13.865-73.285-20.797c-18.817-6.933-31.126-13.13-40.604-20.302-9.161-6.933-15.846-17.331-15.846-17.331s-7.923-10.894-4.456-11.39c3.466-.495 20.797 5.943 20.302 5.943"
        opacity="0.567"
      ></Path>
      <Path
        fill="#7c7c7c"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M84.146 343.038c-1.682.05-3.906 4.03-1.093 10.593 3.214 7.5 14.555 20.124 29.625 29.47 23.035 14.285 53.236 23.374 88.593 33.374s76.045 12.152 83.188 11.438c7.143-.715 7.861-7.518 8.219-10.375s-1.05-8.192-8.907-18.907-26.089-14.299-42.875-17.156c-16.785-2.857-72.857-13.567-85-16.781-12.142-3.214-35.357-10.705-45-13.563-9.642-2.857-26.062-7.875-26.062-7.875a1.07 1.07 0 0 0-.688-.218m-.625 3.562c3.467-.495 20.808 5.938 20.313 5.938 0 0 27.805 8.372 36.719 11.343 62.371 16.662 83.319 20.289 128.687 28.688 11.39 1.485 22.281 23.844 22.281 23.844s4.437 4.97-8.437 8.437c-4.992 1.344-65.344-8.437-65.344-8.437s-54.496-13.85-73.312-20.782c-18.817-6.932-31.116-13.14-40.594-20.312-9.16-6.933-15.844-17.344-15.844-17.344s-7.935-10.88-4.469-11.375"
        opacity="1"
      ></Path>
      <Path
        fill="url(#radialGradient4093)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M84.146 343.038c-1.682.05-3.906 4.03-1.093 10.593 3.214 7.5 14.555 20.124 29.625 29.47 23.035 14.285 53.236 23.374 88.593 33.374s76.045 12.152 83.188 11.438c7.143-.715 7.861-7.518 8.219-10.375s-1.05-8.192-8.907-18.907-26.089-14.299-42.875-17.156c-16.785-2.857-72.857-13.567-85-16.781-12.142-3.214-35.357-10.705-45-13.563-9.642-2.857-26.062-7.875-26.062-7.875a1.07 1.07 0 0 0-.688-.218m-.625 3.562c3.467-.495 20.808 5.938 20.313 5.938 0 0 27.805 8.372 36.719 11.343 62.371 16.662 83.319 20.289 128.687 28.688 11.39 1.485 22.281 23.844 22.281 23.844s4.437 4.97-8.437 8.437c-4.992 1.344-65.344-8.437-65.344-8.437s-54.496-13.85-73.312-20.782c-18.817-6.932-31.116-13.14-40.594-20.312-9.16-6.933-15.844-17.344-15.844-17.344s-7.935-10.88-4.469-11.375"
        opacity="1"
      ></Path>
      <Path
        fill="url(#radialGradient4105)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M84.146 343.038c-1.682.05-3.906 4.03-1.093 10.593 3.214 7.5 14.555 20.124 29.625 29.47 23.035 14.285 53.236 23.374 88.593 33.374s76.045 12.152 83.188 11.438c7.143-.715 7.861-7.518 8.219-10.375s-1.05-8.192-8.907-18.907-26.089-14.299-42.875-17.156c-16.785-2.857-72.857-13.567-85-16.781-12.142-3.214-35.357-10.705-45-13.563-9.642-2.857-26.062-7.875-26.062-7.875a1.07 1.07 0 0 0-.688-.218m-.625 3.562c3.467-.495 20.808 5.938 20.313 5.938 0 0 27.805 8.372 36.719 11.343 62.371 16.662 83.319 20.289 128.687 28.688 11.39 1.485 22.281 23.844 22.281 23.844s4.437 4.97-8.437 8.437c-4.992 1.344-65.344-8.437-65.344-8.437s-54.496-13.85-73.312-20.782c-18.817-6.932-31.116-13.14-40.594-20.312-9.16-6.933-15.844-17.344-15.844-17.344s-7.935-10.88-4.469-11.375"
        opacity="1"
      ></Path>
      <Path
        fill="#212a2a"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M291.571 418.571s1.407 5.979-9.143 7.034-60.487-9.144-60.487-9.144 60.135 10.55 65.059 6.682 5.275-4.22 4.571-4.572"
      ></Path>
      <Path
        fill="#212a2a"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M84.79 353.16s6.681 11.606 13.011 16.88c6.33 5.276 15.826 14.068 35.52 21.804C153.013 399.581 207.17 414 207.17 414l20.396 3.868s-56.97-15.474-72.092-20.045S103.428 382.7 84.79 353.16"
      ></Path>
      <Path
        fill="url(#radialGradient4180)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M84.146 343.038c-1.682.05-3.906 4.03-1.093 10.593 3.214 7.5 14.555 20.124 29.625 29.47 23.035 14.285 53.236 23.374 88.593 33.374s76.045 12.152 83.188 11.438c7.143-.715 7.861-7.518 8.219-10.375s-1.05-8.192-8.907-18.907-26.089-14.299-42.875-17.156c-16.785-2.857-72.857-13.567-85-16.781-12.142-3.214-35.357-10.705-45-13.563-9.642-2.857-26.062-7.875-26.062-7.875a1.07 1.07 0 0 0-.688-.218m-.625 3.562c3.467-.495 20.808 5.938 20.313 5.938 0 0 27.805 8.372 36.719 11.343 62.371 16.662 83.319 20.289 128.687 28.688 11.39 1.485 22.281 23.844 22.281 23.844s4.437 4.97-8.437 8.437c-4.992 1.344-65.344-8.437-65.344-8.437s-54.496-13.85-73.312-20.782c-18.817-6.932-31.116-13.14-40.594-20.312-9.16-6.933-15.844-17.344-15.844-17.344s-7.935-10.88-4.469-11.375"
        opacity="1"
      ></Path>
      <G opacity="1" transform="translate(-74.315 -84.128)">
        <Path
          fill="#758084"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="m596.803 265.658-.498-4.974s1.741-1.243 2.984-1.492c1.244-.248 2.736-2.984 5.222-3.232 2.487-.25 4.228 1.492 4.228 1.492s6.962-3.233 20.142-5.471 31.58-3.73 31.58-3.73l16.164.249.995 1.492s15.417 1.243 18.401 1.492 13.926 1.989 15.666 2.238 4.974 1.492 4.974 1.492l-.249 1.243s-33.57-3.233-42.522-2.735c-8.952.497-44.263 4.227-44.263 4.227l-.746-1.74s31.58-5.72 39.538-5.72-24.37 0-39.787 3.979-23.126 8.454-23.126 8.454l-2.984 1.74-.497 1.493s-4.476.746-5.222-.497"
        ></Path>
        <Path
          fill="url(#linearGradient4344)"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="m596.803 265.658-.498-4.974s1.741-1.243 2.984-1.492c1.244-.248 2.736-2.984 5.222-3.232 2.487-.25 4.228 1.492 4.228 1.492s6.962-3.233 20.142-5.471 31.58-3.73 31.58-3.73l16.164.249.995 1.492s15.417 1.243 18.401 1.492 13.926 1.989 15.666 2.238 4.974 1.492 4.974 1.492l-.249 1.243s-33.57-3.233-42.522-2.735c-8.952.497-44.263 4.227-44.263 4.227l-.746-1.74s31.58-5.72 39.538-5.72-24.37 0-39.787 3.979-23.126 8.454-23.126 8.454l-2.984 1.74-.497 1.493s-4.476.746-5.222-.497"
        ></Path>
        <Path
          fill="url(#radialGradient4346)"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="m596.803 265.658-.498-4.974s1.741-1.243 2.984-1.492c1.244-.248 2.736-2.984 5.222-3.232 2.487-.25 4.228 1.492 4.228 1.492s6.962-3.233 20.142-5.471 31.58-3.73 31.58-3.73l16.164.249.995 1.492s15.417 1.243 18.401 1.492 13.926 1.989 15.666 2.238 4.974 1.492 4.974 1.492l-.249 1.243s-33.57-3.233-42.522-2.735c-8.952.497-44.263 4.227-44.263 4.227l-.746-1.74s31.58-5.72 39.538-5.72-24.37 0-39.787 3.979-23.126 8.454-23.126 8.454l-2.984 1.74-.497 1.493s-4.476.746-5.222-.497"
        ></Path>
        <Path
          fill="url(#radialGradient4348)"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="m596.803 265.658-.498-4.974s1.741-1.243 2.984-1.492c1.244-.248 2.736-2.984 5.222-3.232 2.487-.25 4.228 1.492 4.228 1.492s6.962-3.233 20.142-5.471 31.58-3.73 31.58-3.73l16.164.249.995 1.492s15.417 1.243 18.401 1.492 13.926 1.989 15.666 2.238 4.974 1.492 4.974 1.492l-.249 1.243s-33.57-3.233-42.522-2.735c-8.952.497-44.263 4.227-44.263 4.227l-.746-1.74s31.58-5.72 39.538-5.72-24.37 0-39.787 3.979-23.126 8.454-23.126 8.454l-2.984 1.74-.497 1.493s-4.476.746-5.222-.497"
        ></Path>
        <Path
          fill="#1c1903"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="m597.051 266.155 5.222.249-.497 1.492-4.476.248z"
        ></Path>
        <Path
          fill="url(#linearGradient4350)"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="m597.051 266.155 5.222.249-.497 1.492-4.476.248z"
        ></Path>
        <Path
          fill="#393306"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="M602.025 266.652s1.243-2.735 3.73-3.73c2.486-.994 18.153-7.46 22.131-8.206s32.078-4.227 39.041-3.73 9.947-.248 9.947-.248l-1.99-.746s-21.634.248-24.12.994-23.624 2.487-28.846 4.228-17.655 7.708-17.655 7.708z"
        ></Path>
        <Path
          fill="none"
          fillOpacity="0.75"
          fillRule="evenodd"
          stroke="#000"
          strokeLinecap="butt"
          strokeWidth="1"
          d="M629.378 258.198z"
        ></Path>
        <Path
          fill="url(#linearGradient4439)"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="m629.378 257.452.249 1.492s36.803-4.476 45.755-4.228 41.03 2.487 41.03 2.487v-.995s-35.808-3.232-43.517-2.735-43.765 3.73-43.517 3.979"
        ></Path>
        <Path
          fill="none"
          fillOpacity="0.75"
          fillRule="evenodd"
          stroke="url(#linearGradient4352)"
          strokeLinecap="butt"
          strokeWidth="1"
          d="M613.96 255.96s38.793-9.45 61.422-6.714"
        ></Path>
        <Path
          fill="url(#radialGradient4354)"
          fillOpacity="1"
          fillRule="nonzero"
          stroke="none"
          strokeDasharray="none"
          strokeLinecap="round"
          strokeWidth="1.2"
          d="M607.744 257.576a3.233 1.616 0 1 1-6.465 0 3.233 1.616 0 1 1 6.465 0"
          opacity="0.867"
          transform="rotate(-24.261 604.138 259.31)"
        ></Path>
        <Path
          fill="url(#radialGradient4356)"
          fillOpacity="1"
          fillRule="nonzero"
          stroke="none"
          strokeDasharray="none"
          strokeLinecap="round"
          strokeWidth="1.2"
          d="M607.744 257.576a3.233 1.616 0 1 1-6.465 0 3.233 1.616 0 1 1 6.465 0"
          opacity="0.867"
          transform="matrix(.61481 .03567 -.02194 .99936 232.784 -18.413)"
        ></Path>
      </G>
      <G
        opacity="1"
        transform="matrix(.8587 .03886 -.04414 .83993 -119.017 -73.445)"
      >
        <Path
          fill="#758084"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="m596.803 265.658-.498-4.974s1.741-1.243 2.984-1.492c1.244-.248 2.736-2.984 5.222-3.232 2.487-.25 4.228 1.492 4.228 1.492s6.962-3.233 20.142-5.471 31.58-3.73 31.58-3.73l16.164.249.995 1.492s15.417 1.243 18.401 1.492 13.926 1.989 15.666 2.238 4.974 1.492 4.974 1.492l-.249 1.243s-33.57-3.233-42.522-2.735c-8.952.497-44.263 4.227-44.263 4.227l-.746-1.74s31.58-5.72 39.538-5.72-24.37 0-39.787 3.979-23.126 8.454-23.126 8.454l-2.984 1.74-.497 1.493s-4.476.746-5.222-.497"
        ></Path>
        <Path
          fill="url(#linearGradient4413)"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="m596.803 265.658-.498-4.974s1.741-1.243 2.984-1.492c1.244-.248 2.736-2.984 5.222-3.232 2.487-.25 4.228 1.492 4.228 1.492s6.962-3.233 20.142-5.471 31.58-3.73 31.58-3.73l16.164.249.995 1.492s15.417 1.243 18.401 1.492 13.926 1.989 15.666 2.238 4.974 1.492 4.974 1.492l-.249 1.243s-33.57-3.233-42.522-2.735c-8.952.497-44.263 4.227-44.263 4.227l-.746-1.74s31.58-5.72 39.538-5.72-24.37 0-39.787 3.979-23.126 8.454-23.126 8.454l-2.984 1.74-.497 1.493s-4.476.746-5.222-.497"
        ></Path>
        <Path
          fill="url(#radialGradient4415)"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="m596.803 265.658-.498-4.974s1.741-1.243 2.984-1.492c1.244-.248 2.736-2.984 5.222-3.232 2.487-.25 4.228 1.492 4.228 1.492s6.962-3.233 20.142-5.471 31.58-3.73 31.58-3.73l16.164.249.995 1.492s15.417 1.243 18.401 1.492 13.926 1.989 15.666 2.238 4.974 1.492 4.974 1.492l-.249 1.243s-33.57-3.233-42.522-2.735c-8.952.497-44.263 4.227-44.263 4.227l-.746-1.74s31.58-5.72 39.538-5.72-24.37 0-39.787 3.979-23.126 8.454-23.126 8.454l-2.984 1.74-.497 1.493s-4.476.746-5.222-.497"
        ></Path>
        <Path
          fill="url(#radialGradient4417)"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="m596.803 265.658-.498-4.974s1.741-1.243 2.984-1.492c1.244-.248 2.736-2.984 5.222-3.232 2.487-.25 4.228 1.492 4.228 1.492s6.962-3.233 20.142-5.471 31.58-3.73 31.58-3.73l16.164.249.995 1.492s15.417 1.243 18.401 1.492 13.926 1.989 15.666 2.238 4.974 1.492 4.974 1.492l-.249 1.243s-33.57-3.233-42.522-2.735c-8.952.497-44.263 4.227-44.263 4.227l-.746-1.74s31.58-5.72 39.538-5.72-24.37 0-39.787 3.979-23.126 8.454-23.126 8.454l-2.984 1.74-.497 1.493s-4.476.746-5.222-.497"
        ></Path>
        <Path
          fill="#1c1903"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="m597.051 266.155 5.222.249-.497 1.492-4.476.248z"
        ></Path>
        <Path
          fill="url(#linearGradient4419)"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="m597.051 266.155 5.222.249-.497 1.492-4.476.248z"
        ></Path>
        <Path
          fill="#393306"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="M602.025 266.652s1.243-2.735 3.73-3.73c2.486-.994 18.153-7.46 22.131-8.206s32.078-4.227 39.041-3.73 9.947-.248 9.947-.248l-1.99-.746s-21.634.248-24.12.994-23.624 2.487-28.846 4.228-17.655 7.708-17.655 7.708z"
        ></Path>
        <Path
          fill="none"
          fillOpacity="0.75"
          fillRule="evenodd"
          stroke="#000"
          strokeLinecap="butt"
          strokeWidth="1"
          d="M629.378 258.198z"
        ></Path>
        <Path
          fill="#231002"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeLinecap="butt"
          strokeWidth="1"
          d="m629.378 257.452.249 1.492s36.803-4.476 45.755-4.228 41.03 2.487 41.03 2.487v-.995s-35.808-3.232-43.517-2.735-43.765 3.73-43.517 3.979"
        ></Path>
        <Path
          fill="none"
          fillOpacity="0.75"
          fillRule="evenodd"
          stroke="url(#linearGradient4421)"
          strokeLinecap="butt"
          strokeWidth="1"
          d="M613.96 255.96s38.793-9.45 61.422-6.714"
        ></Path>
        <Path
          fill="url(#radialGradient4423)"
          fillOpacity="1"
          fillRule="nonzero"
          stroke="none"
          strokeDasharray="none"
          strokeLinecap="round"
          strokeWidth="1.2"
          d="M607.744 257.576a3.233 1.616 0 1 1-6.465 0 3.233 1.616 0 1 1 6.465 0"
          opacity="0.867"
          transform="rotate(-24.261 604.138 259.31)"
        ></Path>
        <Path
          fill="url(#radialGradient4425)"
          fillOpacity="1"
          fillRule="nonzero"
          stroke="none"
          strokeDasharray="none"
          strokeLinecap="round"
          strokeWidth="1.2"
          d="M607.744 257.576a3.233 1.616 0 1 1-6.465 0 3.233 1.616 0 1 1 6.465 0"
          opacity="0.867"
          transform="matrix(.61481 .03567 -.02194 .99936 232.784 -18.413)"
        ></Path>
      </G>
    </G>
    <G strokeLinejoin="miter" strokeOpacity="1" opacity="1">
      <Path
        fill="url(#linearGradient4234)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M125.583 322.565s12.66 5.627 19.694 4.22c7.033-1.406 21.1-2.813 21.1-2.813v8.44h-15.473l-8.44 2.814v4.22l-15.474-5.627 12.66 7.033s-7.033 2.814-12.66 2.814-18.287-2.814-18.287-2.814l9.847-2.813v-4.22l-2.813-5.627z"
        opacity="0.57"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M148.09 349.292c5.627 1.407 7.034 5.627 16.88 5.627s19.694 2.813 19.694 2.813-1.407-4.22-11.254-7.033-15.473-4.22-7.033-4.22 15.473-1.407 7.033-4.22-14.066-1.407-14.066-1.407 7.033 9.847-1.407 7.034c-8.44-2.814-11.253 2.813-9.847 1.406"
        opacity="0.526"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M104.483 346.479s19.694 0 29.54 4.22a386 386 0 0 1 18.287 8.44l-11.253-7.033 7.033-2.814-15.473-1.406-9.847-4.22-11.253-1.407z"
        opacity="0.646"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M148.09 271.925s-14.067 11.253-14.067 15.474c0 4.22 10.55 2.813 16.177.703s33.76-14.77 33.76-14.77 18.287-9.144 23.21-10.55 4.22-4.924 1.407-3.517-27.43 13.363-31.65 12.66 9.143-7.033 16.177-9.847 21.803-9.846 21.803-9.846-8.44 1.406-18.286 5.626-22.507 10.55-25.32 11.254c-2.814.703-14.067.703-14.067.703l5.626-7.737z"
        opacity="0.374"
      ></Path>
      <Path
        fill="url(#linearGradient4284)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M238.82 248.012s14.771-7.737 26.024-9.144 25.32-6.33 25.32-6.33-3.516-1.407 3.517-6.33c7.034-4.923 14.77-6.33 17.584-7.033s11.253-2.11 11.253-2.11l6.33-4.22s1.407-4.22-3.516-2.11c-4.924 2.11-26.024 6.33-30.244 8.44s-7.033 4.22-11.253 7.033-7.034 2.11-10.55 5.627-19.694 7.736-23.21 9.846-10.55 6.33-11.254 6.33"
        opacity="0.646"
      ></Path>
      <Path
        fill="url(#linearGradient4276)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M300.715 233.241c-3.517-2.813-7.034-3.516-1.407-7.033s14.067-4.923 14.067-4.923h7.737s-.704 6.33-4.22 7.736c-3.517 1.407-15.474 4.924-16.177 4.22"
        opacity="0.646"
      ></Path>
      <Path
        fill="url(#linearGradient4268)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M314.078 233.241c6.33-1.406 7.034-.703 10.55-4.22s6.33-5.626 6.33-5.626l-6.33 2.813-8.44 3.517z"
        opacity="0.646"
      ></Path>
      <Path
        fill="url(#linearGradient4260)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M331.662 226.208c8.44-2.813 11.956-2.813 17.583-2.813s11.957-.704 17.584-1.407 4.923 0 13.363-1.407c8.44-1.406 21.803-3.516 21.803-3.516s-2.11-2.814-4.923-2.814-18.99 3.517-26.023 2.814c-7.034-.704-16.88-.704-16.88-.704s-7.737 2.11-11.254 3.517-11.253 7.033-11.253 6.33"
        opacity="0.529"
      ></Path>
      <Path
        fill="url(#linearGradient4252)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M328.848 219.175c4.22 0 8.44 0 14.77-2.11s9.144-3.517 9.144-3.517l-7.034-1.407s-9.143 2.11-11.956 3.517c-2.814 1.407-4.924 3.517-4.924 3.517"
        opacity="0.646"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M181.147 229.725c2.813 0 10.55 1.406 16.177 0 5.627-1.407 10.55-5.627 10.55-5.627s4.22.703 7.033-2.11 7.034-7.737 2.814-7.033-12.66 2.813-12.66 2.813l1.406 3.517s0 3.516-4.923 4.22-13.363 2.813-13.363 2.813z"
        opacity="0.646"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M157.937 237.461c10.55-2.813 16.177-4.923 19.693-7.736 3.517-2.814 9.847-7.034 9.847-7.034s4.22-2.813-4.22.704c-8.44 3.516-21.803 7.736-26.023 9.846l-14.067 7.034z"
        opacity="0.646"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M197.324 204.405s28.837-4.924 49.234-11.957c20.396-7.034 70.334-16.177 75.257-16.88 4.923-.704 15.473-3.517 9.847 1.406-5.627 4.924 15.033-4.936 17.847-4.936 2.813 0 21.84-3.647 21.84-6.46s-36.17 5.77-41.094 6.473-77.367 14.77-88.62 17.583c-11.254 2.814-39.388 10.55-39.388 10.55z"
        opacity="0.646"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M704.431 172.051c2.814 0 2.11 2.813 4.924.703 2.813-2.11 5.626-1.406 5.626-1.406l7.737 4.22s6.33 4.923 1.407 4.22c-4.924-.704-9.847-3.517-9.847-3.517l-11.254.703-41.69 5.785z"
        opacity="0.646"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m739.598 158.688 4.923 2.813 2.814 4.923 4.22 1.407.703 4.22 2.11.703 3.517-3.516-2.11-3.517s-4.22 1.407-4.22-1.407-2.11-4.22-2.11-4.22h-4.22z"
        opacity="0.646"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="2"
        d="M621.302 239.45c2.818-1.973 5.464-4.18 8.09-6.399 3.861-3.554 4.496-5.25 9.847-3.903 1.057 4.084-3.792 3.063-3.027 2.899 3.326-1.549 4.443-1.426 8.471-.729 2.917 1.486-4.846 3.38 2.237-1.272 2.695-2.743 6.258-.97 9.618-.802-6.038.522.67-.905 2.05-1.207 2.131-.277 4.167-.887 6.178-1.621 1.776-.694 3.5-1.484 5.329-2.033 1.896-.487 3.75-1.107 5.585-1.786 1.856-.692 3.82-.958 5.784-1.1 1.98-.07 3.914-.367 5.822-.884 1.744-.593 3.585-.881 5.21-1.765 1.46-1.52 2.87-2.363 4.947-2.735 2.002-.019 3.936-.41 5.841-.993 1.925-.66 3.908-1.103 5.85-1.708 2.089-.667 4.136-1.447 6.114-2.394 1.718-.772 3.072-2.061 4.429-3.328 1.705-1.485 3.167-3.2 4.512-5.01 1.98-4.22 4.742 1.175 6.806 1.7.318.012 1.272.04.954.034-10.014-.222 10.602.134.794.029 1.913-.367 3.474-1.63 5.247-2.406 1.88-.665 3.723-1.354 5.275-2.63.885-.884 1.428-2.03 2.092-3.078l3.793.216c-.689 1.074-1.238 2.253-2.118 3.187-1.521 1.373-3.346 2.094-5.272 2.754-1.849.699-3.36 1.975-5.244 2.548-13.717-.008 5.873-.295-9.255-.195-5.005-2.334 3.876-5.27.664-1.92-1.343 1.81-2.77 3.561-4.431 5.09-1.417 1.257-2.75 2.65-4.509 3.43a47 47 0 0 1-6.096 2.453c-1.939.599-3.911 1.077-5.84 1.705-1.887.637-3.835 1.083-5.84 1.053-2.094.276-3.536.956-4.935 2.589-1.569 1.021-3.472 1.265-5.23 1.86-1.897.596-3.85.872-5.836.966-1.942.113-3.904.325-5.742.997-1.847.659-3.695 1.325-5.597 1.813-1.86.498-3.583 1.316-5.38 1.996-2.003.744-4.018 1.455-6.157 1.68-3.262.642-5.965 1.97-9.52 1.253-5.112-.55 3.756-1.947-2.211.606-2.514 1.695-7.55 4.664-9.716 1.197 6.86-1.151.638-.127-.888.939-5.211 1.644-5.482.283-4.536-3.249 7.387-1.872-.957 1.678-2.514 4.063-2.577 2.2-5.16 4.4-7.853 6.457z"
        color="#000"
        opacity="0.23"
        visibility="visible"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="2"
        d="M628.74 237.725c-.977.33-1.976.657-2.969.938-2.503.797-4.916 1.797-7.375 2.718-2.408.887-4.827 1.726-7.218 2.657l3.75.437c2.374-.889 4.748-1.74 7.125-2.625 2.47-.942 4.937-1.948 7.468-2.719 1.008-.267 1.982-.604 2.97-.937zm-17.187 6.844c-1.425.231-2.863.355-4.282.625-1.975.437-3.926 1.018-5.75 1.906-1.712.837-3.4 1.805-5.28 2.219-.598.092-.859.166-1.063.219-1.015.026-2.354.067-4.47.156-1.95.438-3.717 1.134-5.25 2.469-1.665 1.012-3.529 1.659-5.062 2.875-.912.831-2.798 1.721-3.375 2.25l-.53-.094c.06-.19-.81-.276-1.595-.25-2.327-.389-3.976-.568-1.03.469.03.03.046.06.093.093-2.751-.32-6.793-3.962-7.969.438-1.643 2.747-3.653 5.317-6.469 6.937-1.1-.029-2.854.006-5.593.157-1.765.947-3.383 2.187-5.344 2.718-1.811.4-3.708.227-5.438 1-2.125.844-4.268 1.722-6.312 2.75-2.445 1.284-4.786 2.71-7.156 4.125l3.78.407c2.302-1.476 4.636-2.898 7.063-4.157 2.087-1.01 4.233-1.85 6.407-2.656 1.743-.728 3.635-.494 5.437-.969 1.466-.489 2.771-1.314 4.094-2.093 1.248.093 5.617-.293 6.719-.844 2.775-1.788 4.801-4.373 6.5-7.156.061-.081.103-.144.156-.22.179.048.345.083.562.126 1.76-.122 3.033-.225 3.97-.344.287.138.653.289 1.218.469 4.565.558 5.613-.353 8.594-2.813 1.558-1.151 3.403-1.795 5.03-2.843 1.496-1.369 3.312-1.954 5.25-2.344 5.117-1.186-7.802 1.999 5.563-.344 1.876-.494 3.545-1.49 5.282-2.312 1.813-.86 3.731-1.425 5.687-1.844 1.449-.203 2.9-.356 4.344-.594zm-53.844 20.875c.186.01.589.022.781.031-.013.027-.041.043-.031.063-.584.095-.964.145-1.313.218.187-.105.373-.213.563-.312"
        color="#000"
        opacity="0.443"
        visibility="visible"
      ></Path>
      <G
        fill="#fff"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="2"
        color="#000"
        transform="translate(-78.385 -99.4)"
        visibility="visible"
      >
        <Path
          d="M281.13 464.297c5.118.096 10.256-.333 15.329.406 5.3 1.142 10.662 1.71 16.074 1.876 5.056-.29 9.859.845 14.489 2.768 4.317 2.292 9.057 3.42 13.895 3.814 19.63.709-2.536.758 4.377.321 33.625-4.14-2.651 6.6 13.05-2.741l10.338.833c-5.099 5.362-30.654 3.55-10.82 3.434l-2.377.01c-8.245.717-16.54.325-24.773-.344-4.874-.564-9.572-1.875-13.97-4.095-4.627-1.759-9.376-2.666-14.355-2.432-5.402-.244-10.74-.919-16.048-1.964-5.095-.482-10.208-.212-15.32-.284z"
          opacity="0.43"
        ></Path>
        <Path
          d="M363.549 478.72c5.114-.313 9.985 1.289 14.913 2.342 5.715.438 10.775.873 15.779 3.83 3.465 2.603 11.061 2.357-3.4 1.448l10.212 1.442c-8.507.228-11.256 2.003-17.033-1.807-5.02-2.716-10.278-2.805-15.84-3.522-4.83-1.167-9.674-2.38-14.692-2.14z"
          opacity="0.43"
        ></Path>
        <Path
          d="M295.673 462.82c5.741-2.35 11.399-1.287 17.754-.703 2.543.234-5.112.07-7.66-.098-1.615-.106 3.218-.366 4.824-.571 1.746-.401 33.322 6.135 13.12 4.698 6.198-3.055 1.567-1.314 14.842-.05l-10.264 1.098c9.037-1.316 10.435-2.58 5.647.288-2.695.165-34.106-1.146-13.144-4.55-40.91 5.192.97-3.025-14.886 1.105z"
          opacity="0.43"
        ></Path>
      </G>
      <G
        fill="#fff"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="2"
        color="#000"
        transform="translate(-78.385 -99.4)"
        visibility="visible"
      >
        <Path
          d="M199.938 392.531c-3.694 5.763-7.868 12.196-14.687 14.265-10 5.35-21.171 10.02-27.684 19.67-2.925 4.167-7.48 9.853-4.005 15.034 4.463 4.63 11.835 2.794 17.606 2.486 2.342-.281 4.63-.438 6.363 1.295 2.606 1.45 6.467-.191 8.531 1.75 3.33 5.003 10.398 5.814 16.063 4.656 8.911.511 15.147 8.35 23.84 9.7 6.246 1.299 12.646 1.99 18.754 3.613 12.556-5.664-12.151-7.385-15.76-7.916-9.095-1.8-15.927-9.916-25.615-9.709-3.92-.09-9.172 1.766-11.531-2.562-1.644-3.664-5.778-2.015-8.782-2.75-1.65-1.405-3.245-3.156-5.75-2.844-3.576.253-7.02-.056-10.437.875-2.638-.284-6.674 1.277-8.438-1.25-.323-3.9 2.661-7.473 4.858-10.483 8.134-10.827 22.027-14.332 32.767-21.83 4.147-3.716 18.89-29.864 21.552-34.5-1.834-.067-16.305 18.678-17.645 20.5"
          opacity="0.583"
        ></Path>
        <Path
          d="M198.5 395.219c-5.53 4.929-9.845 11.694-17.156 14-9.94 6.043-18.673 14.304-28.625 20.406-2.275 3.562 1.588 7.098 3.937 9.5 3.6 3.709 9.078 2.832 13.688 2.344 1.29.305.924 2.313 2.719 1.719 3.016-.554 6.14-.248 8.28 2.125 6.97 3.713 15.556 2.922 22.189 7.415 1.472.668 4.693 2.91 5.624 1.116-5.072-1.297-9.35-4.836-14.625-5.656-5.118-1.19-10.895-1.523-14.75-5.407-3.626-1.302-7.739-.471-11.437-1.719-3.33.247-6.863.844-9.486-1.778-2.596-1.945-6.571-5.382-4.92-8.878 2.379-2.973 6.442-3.693 9.118-6.5 8.602-6.536 17.11-13.42 26.756-18.219 3.546-2.888 6.287-6.753 9.563-9.812-.273-.197-.578-.699-.875-.656"
          opacity="1"
        ></Path>
      </G>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="2"
        d="M128.959 288.475c-4.765 3.943-6.712 9.971-10.813 14.531-2.599-2.689-3.794 2.215-5.687 3.282-6.159 5.894-13.545 10.442-21.75 12.937-3.448 5.654-9.621 9.496-15.188 12.156 2.982.048 1.735 4.062 3.907 5.032.502 1.886 1.586 4.2 3.937 3.437 3.422-.122 4.975 4.385 8.656 3.344 8.773-1.459 15.45 6.873 24.125 6.531 9.596 2.558 18.024 8.584 27.907 10.094 1.249.402 3.958 1.149 4.687.031-12.682-.653-23.071-9.162-35.437-11.219-5.246-1.154-10.092-3.507-14.875-5.75-2.182-.248-5.577.258-5.25-2.968-1.261-4.525-4.001-8.438-5.5-12.875 8.416.826 12.383-8.09 18.562-12.032 8.142-5.637 15.389-12.96 19.719-21.875.837-1.703 3.617-3.288 3.594-4.812-.185-.156-.453-.138-.594.156M95.615 318.35c3.803.135 1.85 6.104-1.312 5.188-3.264-.741-1.19-5.173 1.312-5.188"
        color="#000"
        opacity="0.857"
        visibility="visible"
      ></Path>
      <Path
        fill="#cee5e9"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M432.084 237.381s-7.493 3.508-16.219 7.97c-8.726 4.46-18.668 9.842-23.594 13.655l-4.405 3.59c4.77-3.693 19.728-11.888 28.437-16.34s20.638-10.686 20.638-10.686z"
        opacity="1"
      ></Path>
      <Path
        fill="url(#radialGradient4701)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M467.022 235.952c-.185.185-7.888 3.848-10.007 4.378-3.12.78-2.578 1.815-4.378 4.066-.326.407-.626.834-.939 1.25-1.008 1.345 3.356-.954 5.004-.625.178.036-3.74 3.18-7.193 5.942-1.568 1.254-4.41 3.128-.938 3.128 3.728 0 8.94-3.688 12.197-5.317 1.7-.85 2.203.626 4.378.626 3.238 0 6.88-2.972 9.695-4.379 3.178-1.589 5.654-1.96 9.069-2.814 3.324-.831 6.676-1.357 10.007-2.19 1.701-.425 4.566-3.272 5.63-4.69 1.094-1.46 4.822-2.43 6.567-3.128 1.295-.518 5.458-2.075 2.502-2.814-2.07-.518-4.741.833-6.568 1.563-.384.154 2.172-2.193-.312-2.814-1.661-.416-3.9 0-5.63 0-1.931 0-2.26.938-4.378.938-1.772 0-4.141-.607-6.567 0-2.521.63-4.538 1.603-6.88 2.189-2.439.61-4.389 1.69-6.88 2.19-1.47.293-2.979 1.381-4.379 2.501"
        opacity="0.443"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="3"
        d="M353.803 166.406c-66.801 9.607-135.501 18.136-196.567 48.644-12.757 6.328-25.536 12.884-36.496 22.012 8.03-.163 13.115-7.084 20.106-9.894 57.912-33.252 124.53-45.857 190.02-54.324 9.095-1.296 37.537-7.048 46.523-8.977-1.356-.591-21.98 2.276-23.586 2.54"
      ></Path>
      <G
        fill="#fff"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="3"
        color="#000"
        transform="translate(-62.385 -113.4)"
        visibility="visible"
      >
        <Path
          d="M451.548 267.126c-.416 6.535-5.783 11.378-11.24 14.238-14.933 8.276-31.264 13.635-46.263 21.767-1.346 1.403-5.23 1.792-4.975-.619 2.261-1.785 5.134-2.534 7.608-3.975 14.968-7.14 30.796-12.595 44.95-21.354 3.149-2.174 5.976-5.349 6.466-9.28.572-1.476 2.323-.588 3.454-.777"
          opacity="0.57"
        ></Path>
        <Path
          d="M503.66 281.601c-26.438 2.183-52.075 9.363-77.696 15.84-17.444 4.57-34.471 10.686-51.005 17.871-5.25 2.53-10.23 5.58-15.1 8.772H343.3c14.04-9.542 30.307-14.91 46.184-20.512 16.722-5.542 33.882-9.615 50.96-13.883 15.012-3.563 30.189-6.722 45.587-7.993 5.874-.261 11.753-.005 17.63-.095"
          opacity="0.57"
        ></Path>
        <Path
          d="M340.107 325.06c12.998-4.734 25.29-11.361 38.707-14.942 14.388-4.29 29.014-7.72 43.595-11.268 13.588-2.913 27.272-5.735 41.181-6.476 9.087-.824 18.205-1.434 27.334-1.123 3.178.04 6.356.09 9.533.088h-16.98c5.887-.038 11.775-.06 17.662-.133-10.216-.077-20.371 1.27-30.547 1.962-19.404 2.557-38.538 6.842-57.464 11.771-12.843 3.287-25.63 6.951-37.83 12.198-6.084 2.383-11.766 5.784-18.045 7.658-3.007.589-6.132.111-9.187.266z"
          opacity="0.57"
        ></Path>
        <Path
          d="M302.253 333.125c12.137-5.026 24.953-8.215 36.98-13.534 4.26-1.726 8.503-3.491 12.793-5.141h15.844c-13.407 5.16-26.547 11.057-40.275 15.347-2.896 1.055-5.762 2.188-8.624 3.328z"
          opacity="0.57"
        ></Path>
        <Path
          d="M548.198 292.36c-7.148 2.146-14.698 1.556-22.058 1.902-12.544-.06-25.038-1.427-37.58-1.6 4.018-.046 8.036-.041 12.053-.008-13.16-.126-26.42 1.02-39.479-1.158-6.936-.631-13.878-1.316-20.833-1.647-.957.18-6.332.05-3.004-.423 9.025-1.088 18.135-.865 27.204-.704-4.843 1.424-9.94 1.631-14.821 2.91-5.242 1.094-10.49 2.48-15.253 4.986-1.152 1.185 2.626 1.414.066 1.281-4.318.094-8.644.384-12.96.078 2.71-1.856 6.22-1.812 8.996-3.563 2.735-1.337 5.93-3.09 6.732-6.25.142-3.363-3.513-5.051-6.349-5.461-2.327-.395-4.69-.418-7.042-.516 5.663-.055 11.34-.045 16.978-.631-3.21.188-7.368 2.587-6.663 6.284.71 1.266 5.253 2.276 1.892 3.305-3.217.506-7.046 2.05-9.92-.247 1.036-3.161 6.666-2.88 6.16-6.923-.275-3.824-4.13-5.886-7.338-7.046-1.364-.298-3.427-1.952-.626-1.428 4.728.484 9.428 1.269 14.135 1.877 3.729 1.473-1.788 3.972-1.411 6.5-.487 3.775-1.553 7.52-3.724 10.693-2.662 4.202-6.806 7.306-11.453 9.007-7.584 3.422-15.54 5.89-23.508 8.234-3.917 1.185-7.663 2.916-11.529 4.195-4.218.576-8.485-.077-12.723.233-1.174.132-5.19.034-2.27-.854 7.505-3.188 15.418-5.228 23.124-7.831 5.422-2.057 11-3.97 15.921-7.083 5.64-4.1 9.08-10.884 9.49-17.8 1.075-5.316 6.96-8.234 12.034-7.686 5.591.16 11.453 1.795 15.565 5.743 2.355 2.676.962 7.16-2.604 7.821-8.421 3.615-18.334 4.148-26.896.713-2.698-1.815-.8-6.044 1.92-6.756 5.746-2.122 12.028-1.143 17.965-.605 3.484.542 7.056.344 10.51 1.03 2.595.572 5.603 2.578 5.156 5.603-1.32 3.634-5.32 5.037-8.448 6.712-9.041 4.039-19.433 4.492-28.986 2.15 7.213-4.64 15.928-5.678 24.174-7.24 8.846-1.287 17.748-2.233 26.682-2.617-.443 2.107-4.386.704-6.21 1.325-3.017.14-6.05.245-9.026.793 4.182.554 8.437-.078 12.603.697 7.401.632 14.842 1.03 22.162 2.356-2.982.716-6.075.026-9.104.122-1.417-.047-3.005-.257-.725-.184 15.929.012 31.88-.306 47.78.873 3.097.158 6.193.346 9.278.663-5.231.157-10.462-.117-15.692-.2 4.458-.012 8.942-.438 13.25-1.626z"
          opacity="0.57"
        ></Path>
        <Path
          d="M448.952 289.228c9.38.016 18.76-.025 28.14.005-3.814 1.017-7.808.357-11.702.633-11.034.104-22.09.172-33.096-.757 6.75.698 13.515 1.244 20.27 1.884 3.968 2.623 8.92 2.507 13.487 2.512-4.78.194-9.56.594-14.347.424 3.56-1.51 7.533-1.283 11.24-2.222 2.607-.602 6.253-.683 8.143-1.985-.654-1.326-5.963-.454-2.438-.705 4.438.074 8.877.075 13.315.091-9.143-.084-18.162 2.165-26.55 5.698-4.86 1.729-9.716 4.034-14.984 3.942-3.236.18-6.484.349-9.723.124 3.678-1.71 7.854-1.464 11.738-2.394 14.31-2.323 28.77-4.272 43.302-3.815 9.275-.021 18.551-.014 27.827.049-10.438-.202-20.875-.488-31.315-.623 4.233-.037 8.467-.021 12.7-.001-18.296-.115-36.53 1.978-54.58 4.805-10.34 1.85-20.528 4.448-30.697 7.058-4.795 1.323-9.541 2.857-14.122 4.805-5.373.34-10.766.063-16.14.115.811-1.373 5.21-2.031 7.288-3.02 11.63-3.705 23.623-6.093 35.53-8.704 11.023-1.87 22.156-3.011 33.27-4.167 17.393-1.32 34.854-.952 52.276-.722 1.155.013 4.195.247 1.484.276-7.057.28-14.121.105-21.182.124 4.247-.004 8.493-.01 12.74.008-16.257-.4-32.382 2.159-48.347 4.923-8.095 1.224-16.36 2.015-24.519.932 10.952-3.37 21.47-9.045 33.174-9.216 8.871-.517 17.758-.057 26.636-.192 2.25.098 1.312 2.138-.424 1.104-3.692-.579-6.916 1.968-10.549 2.079-9.57 1.698-19.343 1.957-29.022 1.222-4.102-.116-8.53-.137-12.063-2.525 8.918-1.125 17.946-2.088 26.926-1.16 2.91.095-2.127.066-2.993.077-2.793.009-5.586.012-8.38-.049 2.562-.13 7.423.087 8.52-.587-8.879-.15-17.759.027-26.638-.046z"
          opacity="0.57"
        ></Path>
        <Path
          d="M427.955 291.345c-6.937 3.9-13.958 7.804-21.497 10.41-4.223.797-8.56 1.01-12.837 1.087-3.451-1.988 2.18-3.68 3.707-4.701 6.522-3.926 13.866-6.668 21.526-7.005 3.806-.404.257 3.88-1.825 3.565-9.17 4.263-18.947 6.944-28.419 10.42h-15.822c9.161-3.347 18.415-6.455 27.525-9.93 6.928-1.967 14.056-3.293 21.254-3.665 3.429 1.785-2.484 3.645-4.019 4.555-7.985 4.203-16.098 8.623-25.028 10.388-3.66.275-3.841-5.793-.186-5.753 6.108-2.52 12.023-5.494 17.718-8.836 3.562-1.23 7.394-.171 11.076-.533 2.275-.005 4.551-.013 6.827-.002"
          opacity="0.57"
        ></Path>
      </G>
      <Path
        fill="url(#linearGradient4236)"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeWidth="1.2"
        d="M607.744 283.686a3.854 1.368 0 1 1-7.709 0 3.854 1.368 0 1 1 7.71 0"
        opacity="0.57"
        transform="matrix(2.09988 .07335 -.0858 1.25998 -855.812 -226.262)"
      ></Path>
      <G
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1"
        color="#000"
        opacity="1"
        transform="translate(-78.385 -101.4)"
        visibility="visible"
      >
        <Path
          d="M572.13 195.825c1.9.25 11.087-.062 2.915.144 4.139-.621 8.18-.008 12.275.295 2.49.24 4.985.259 7.484.212-8.534.387.341-.346 2.332-.449 4.023-.438 8.023-.137 12.038.01 2.463-.01 4.906.421 7.333.808 2.28.469 4.61.305 6.918.409 2.496.385 5.017.403 7.534.333 2.591.045 5.188.081 7.774.259 2.566.186 5.137.02 7.706.035 2.32.083 4.64.126 6.962.095 2.387.01 4.773.195 7.132.561 2.289.397 4.594.683 6.9.962 2.394.249 4.823.166 7.195.585 2.467.24 4.912.68 7.383.868 7.69 1.146-13.549-2.035 7.2.277 2.295.118 4.59.275 6.888.364 2.342-.004 4.54.836 6.815 1.271 2.394.408 4.654 1.217 6.907 2.086 2.161.9 4.257 1.958 6.475 2.712 5.538 1.44.528 2.308-.86-1.045-1.313-1.959-.849 3.06-3.982 1.763-2.202-.8-4.303-1.851-6.477-2.726-2.245-.867-4.522-1.6-6.904-2.002-2.255-.474-4.463-1.238-6.797-1.198-2.284-.11-4.571-.214-6.85-.402-7.418-.762 10.644-.065-7.224-.262-2.478-.23-4.938-.633-7.413-.899-2.38-.33-4.793-.309-7.181-.569-2.31-.284-4.618-.59-6.915-.972-2.35-.325-4.72-.515-7.094-.49-2.316.024-4.629-.037-6.944-.103-2.577.024-5.156.117-7.73-.063a132 132 0 0 0-7.76-.218c-2.53.048-5.05-.048-7.565-.359-2.307-.076-4.632.017-6.906-.47-2.428-.382-4.871-.759-7.336-.749-9.825-.435 1.962-.024-2.378-.246-3.99.184-7.932.853-11.944.706a68 68 0 0 1-7.516-.255c-9.246-.796.015-.122-2.646-.503-4.188.116-8.39.353-12.577.068z"
          opacity="1"
        ></Path>
        <Path
          d="M605.433 196.452c2.48-.027 4.955-.027 7.429.15 2.22.183 4.444.218 6.669.212-9.033-.185 3.959.08 7.194.62 2.508.421 5.025.775 7.532 1.195 2.45.49 4.94.521 7.419.722 2.494.283 4.94.797 7.45.925.393.005 1.57.014 1.178.015-8.817.027 4.107-.03 6.064.124 2.31-.014 4.536.593 6.82.826 7.811.7-12.79-1.096 7.334.253 2.59.31 5.207.34 7.792.677 2.515.505 5.043.958 7.602 1.159 2.5.132 5.008.241 7.5.487 2.274.27 4.531.523 6.823.553 2.434-.057 4.712.712 7.055 1.21 2.295.51 4.612.9 6.918 1.347 2.25.344 1.57.574 3.448 1.833l3.566 6.53-.883-.687c-1.714-1.457-3.14-3.192-4.83-4.671-1.886-1.179-3.928-2-6.139-2.33-2.32-.412-4.627-.874-6.933-1.362-2.329-.545-4.628-1.174-7.05-1.112-2.287-.064-4.542-.353-6.815-.59-2.495-.225-5-.338-7.5-.485-2.551-.256-5.069-.731-7.593-1.176-2.59-.285-5.197-.392-7.79-.65-7.393-.472 11.462.137-7.351-.274-2.267-.278-4.5-.801-6.796-.81-2.456-.168-1.759-.085 2.414-.142.41-.006-.82.015-1.23.022-2.809.051-5.62.095-8.427-.013-2.503-.177-4.953-.707-7.451-.931-2.48-.166-4.96-.29-7.406-.77-2.516-.416-5.043-.756-7.557-1.19-8.979-1.448 8.696.128-7.203-.538-2.205-.007-4.411-.05-6.609-.253-2.477-.142-4.954-.12-7.434-.117z"
          opacity="1"
        ></Path>
      </G>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M465.919 178.257c2.517.077 5.01.213 7.51.507 2.475.246 4.87.943 7.312 1.375 9.545.564-1.086.457 2.087.353 4.082-.162 8.166-.232 12.25-.317q3.654-.071 7.308-.147l-3.515.074 2.416-.053c2.91-.061 5.82-.097 8.732-.136 2.439.118 4.831.657 7.241 1.02 2.497.246 5.013.243 7.511.46 1.937.28 10.796.019 2.49.185 4.056-.359 8.054.002 12.062.51 2.345.453 4.706.547 7.086.495 2.647.203 5.305.081 7.952.233 2.617.23 5.245.105 7.868.132 2.422.055 4.843.105 7.266.091 2.529-.039 5.047.193 7.576.215 6.942-.143-6.386.195 3.064-.38 4.166-.208 8.337-.349 12.505-.155 10.853.29-2.786.591 2.46.289 2.49-.19 4.983-.253 7.477-.326 16.064-.821-4.372.683 7.54-.425 2.556-.336 5.125-.5 7.698-.633 4.038-.565 8.033-.684 12.118-.777 2.241.151 4.48.315 6.726.384.376.007 1.503.014 1.127.021-7.845.145-.871-.452 1.083-.843 2.495-.37 4.917-.9 7.257-1.843 1.26-.476 2.462-1.087 3.664-1.692 0 0-3.531 3.775-6.042 4.117-3.951.757-7.835 1.599-11.93 1.082-2.238-.11-4.472-.253-6.709-.358 8.436-.212-.58.12-2.5.547-2.542.16-5.092.24-7.615.624-2.472.259-16.836.797-7.563.459-2.5.048-5 .124-7.494.303-4.06.292-8.096.259-12.142-.092-5.723-.233 4.986-.21-2.882-.047-4.209.26-8.412.685-12.636.592-2.545-.043-5.085-.267-7.63-.199-2.39-.021-4.778-.04-7.166-.11-2.64.011-5.285.067-7.92-.146-2.65-.104-5.307-.072-7.958-.2-2.386.027-4.746-.142-7.1-.56-1.812-.205-10.5-.833-2.4-.648-4.045.09-8.11.304-12.152-.027-2.505-.185-5.024-.2-7.52-.494-2.397-.375-4.782-.904-7.215-.954 1.186-.037 2.372-.067 3.558-.11 3.722-.136-14.896.394-11.174.238q-3.667.08-7.333.15c8.353-.177-.652-.004-2.587.107-3.914.15-7.867.453-11.743-.243-2.44-.458-4.847-1.113-7.326-1.341-2.492-.285-4.987-.355-7.49-.504z"
        color="#000"
        opacity="1"
        visibility="visible"
      ></Path>
      <G
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1"
        color="#000"
        transform="translate(-78.385 -99.4)"
        visibility="visible"
      >
        <Path
          d="M833.152 263.298c2.62-1.598 5.03-.725 4.2 2.346l-2.215-.063c.38-1.22 1.605-3.912.205-2.071z"
          opacity="1"
        ></Path>
        <Path
          d="m843.955 277.362-.076 1.243-2.206-.014.09-1.229z"
          opacity="1"
        ></Path>
        <Path
          d="M803.163 302.586c1.286-.32 2.587-.566 3.882-.843 1.401-.3 2.795-.632 4.192-.952a161 161 0 0 1 3.425-.745 22 22 0 0 0 2.953-.769c.933-.33 1.833-.742 2.728-1.163.93-.447 1.821-.972 2.676-1.549a19 19 0 0 0 2.297-1.908c.797-.874 1.44-1.873 2.144-2.82.91-1.224 2.026-2.23 3.303-3.053 1.946-1.064 4.09-1.689 6.198-2.342 1.349-.387 2.682-.9 4.096-.944 1.835.058 1.12-.045 2.16.142l-1.183.167c-.724-.118-.66-.07.206-.124-1.443.006-2.81.511-4.187.899-2.094.64-4.219 1.262-6.15 2.317-1.267.808-2.376 1.8-3.276 3.012-.7.95-1.335 1.953-2.117 2.84-.709.712-1.491 1.342-2.306 1.93a21 21 0 0 1-2.676 1.567c-.893.424-1.791.84-2.72 1.179-.972.33-1.963.594-2.973.78-1.146.24-2.293.48-3.435.742-1.403.316-2.804.647-4.21.951-1.277.277-2.561.52-3.827.846z"
          opacity="1"
        ></Path>
        <Path
          d="M833.18 285.626c-1.585.468-3.054 1.242-4.48 2.063-1.679.946-3.085 2.197-4.188 3.77l-.398.684-1.15-.06.409-.694a12.8 12.8 0 0 1 4.214-3.816c1.4-.82 2.841-1.593 4.387-2.104z"
          opacity="1"
        ></Path>
        <Path
          d="M817.48 287.03c1.256-.925 2.675-1.604 4.043-2.348 1.893-1.003 3.61-2.285 5.33-3.554l.806-.593 1.116.105-.81.592c-1.724 1.266-3.442 2.55-5.329 3.57-1.34.742-2.724 1.428-3.967 2.33z"
          opacity="1"
        ></Path>
        <Path
          d="M807.3 282.705c-.605-1.276-1.579-2.231-2.647-3.122-1.993-1.476-4.132-2.744-6.246-4.037-1.359-.805-.68-.41-2.034-1.185l1.614-.17c1.348.779.673.382 2.025 1.19 2.122 1.309 4.269 2.587 6.283 4.057 1.098.904 2.112 1.873 2.715 3.187z"
          opacity="1"
        ></Path>
        <Path
          d="M807.395 255.326c-2.263-.208 2.058-.11 2.618.018-2.888.042-.337-.047 1.252.002.792.196 5.168-.23 3.577.405-1.94.03-3.88.02-5.819.015-2.277-.476 5.389.236 6.065.279 1.221.209 6.525-.093 1.071.26a63 63 0 0 0-4.498-.475c-3.442-.366.554-.466 2.075-.433a66 66 0 0 1 6.42.899c3.247.685-1.46.589-2.827.327-1.41-.606-5.681-.533-.485-.945 1.52.19 3.013.557 4.463 1.045 1.183.984-3.17-.19-3.96-.42 2.215-.307 4.175.514 6.267 1.076 3.39.608.192.619-1.56.114-.994-.986 3.86.633 4.908.925 3.523.576.54.759-1.346.113-.818-.91 3.463.652 4.396.923 2.534.229 3.157 1.53-.267.538-3.13-.994 2.256.228 3.168.51 1.165.593 6.202 1.03 1.1.79-1.155-.775-5.312-1.274-.46-.81 1.095.638 2.281 1.084 3.479 1.48.195.067.789.164.585.2-4.619.802-1.86-.41 1.319 1.092 3.4 1.034.292.954-1.506.203 2.116-.145 3.402.84 5.098 1.82.156.078.64.242.466.235-3.964-.173-2.586-1.95-.064-.574 2.668.854 1.945 1.935-.917.81-1.022-.448-1.998-.99-2.96-1.555-1.046-.599-2.144-1.097-3.237-1.603a50 50 0 0 1-3.18-1.486 19.6 19.6 0 0 0-3.135-1.267 15.8 15.8 0 0 0-3.6-.931c-2.453-.93 8.073 1.416 1.193.27-.902-.81-2-1.348-3.103-1.826-1.132-.26-2.076-.921-3.095-1.439l-.465-.188 1.71-.2.455.203c1.008.545 1.99 1.128 3.107 1.427 1.085.52 2.204 1.032 3.07 1.891-1.865 1.14-3.778-.481-1.17-.382 1.238.196 2.427.53 3.604.959 1.076.353 2.122.779 3.131 1.294a55 55 0 0 0 3.171 1.481c1.098.507 2.196 1.016 3.246 1.62.958.554 1.931 1.087 2.947 1.53 1.452.57-1.989.639-2.47-.426-2.23-1.218 4.784-.009-.385.335-1.016-.561-3.933-1.46-1.727-2.197 2.607 1.107-.914 1.063-1.842.183-3.18-1.552 1.605-1.307-1.954-1.265-1.19-.41-2.366-.877-3.448-1.529 1.47-.826 2.339-.22 3.819.458-1.536.746-2.838.067-4.442-.391-2.907-.91-2.514-1.353.194-.94 1.279.395-2.589.688-3.098-.105-1.42-.42-4.412-1.403-1.03-1.349 2.647.961-1.079.837-2.005.313-1.362-.386-5.086-1.447-1.554-1.36 2.387.739-.993.914-1.806.324-.934-.257-5.455-.961-2.917-1.514 1.377.386 3.3.887.576.852-1.434-.482-2.913-.846-4.42-1.003 1.288-.422 2.495.229 3.813.456 2.402.429.206.375-.49.136a57 57 0 0 0-6.425-.876c1.285-.076-1.521-.29 1.247-.072a73 73 0 0 1 4.486.487c-1.413.537-2.867.302-4.365.229-1.113-.076-6.192-.388-2.742-.794 2.095.012-1.246.017 2.454-.006 1.579.543-2.786.014-3.526.106-1.547-.054-4.271-.508-1.332-.519 5.604.62-1.98.292-2.611.516z"
          opacity="1"
        ></Path>
      </G>
      <Path
        fill="#1c2e3b"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M349.444 289.408s14.113-10.646 21.293-11.884 17.578-1.98 22.283 0c4.704 1.98 8.665 5.447 8.665 5.447s-5.447-8.17-20.797-7.923c-15.35.248-31.444 14.36-31.444 14.36"
      ></Path>
      <Path
        fill="none"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="url(#linearGradient3927)"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M726.801 258.822s-2.984 10.444-6.465 16.91-7.957 12.93-15.915 17.903l-7.957 4.974"
        opacity="0.75"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M466.703 311.312s18.286-12.66 20.396-11.957c2.11.704-11.253 11.957-11.253 11.957l-7.033 7.737-7.034 4.22s8.44-7.034 4.924-11.957"
        opacity="0.646"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M421.977 300.025c6.609-.186 15.495-9.43 23.574-11.083 3.399-.695 26.736-12.583 30.41-11.726 2.83.66-20.682 12.274-22.178 13.474-1.824 1.462-5.634 1.808-7.668 2.982-2.59 1.496-6.243 2.601-8.75 3.608-2.251.903-3.44 1.986-4.875 2.814-1.487.859-3.79 3.38-4.906 4.638-1.859 2.097-3.664 3.199-5.218 4.096-2.795 1.614-3.33 2.17-2.335-1.54.797-2.972 4.113-2.317 1.946-7.263"
        opacity="0.409"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="0.75"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M422.267 315.644c-.17 1.816.511 3.677 1.327 5.308.932 1.864 2.558-3.49 4.422-4.423 1.459-.73 3.806-3.631 4.423-4.865 1.057-2.114 5.314-3.097 7.519-3.538 2.492-.499 4.804-2.418 7.518-3.096 3.058-.765 4.675-2.97 7.519-3.538.899-.18 4.998-4.114 5.307-4.423 1.875-1.875 4.356-3.155 5.308-4.423 1.742-2.323-5.364 2.24-7.961 3.538-.264.132-.59 0-.885 0-2.536 0-4.163 2.901-6.192 4.423-2.55 1.913-5.514 2.035-7.518 3.538-2.147 1.61-4.386 2.424-7.077 3.096-2.547.637-4.506 1.936-5.307 3.538-.367.735-4.644 2.765-5.307 3.096-1.014.507-1.971 1.095-3.096 1.77"
        opacity="1"
      ></Path>
      <Path
        fill="#fff600"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M492.959 215.225c-6.17 2.06-26.885 8.935-32.68 11.306 2.106 1.21 18.326-6.441 20.464-6.645 4.32-1.306 16.7-6.004 20.79-7.594.008-.45-8.179 2.778-8.574 2.933"
        opacity="1"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="2"
        d="M422.718 251.158c-6.97 4.08-27.323 13.27-33.165 18.817.562 1.31 5.004 2.134 5.439.814 4.657-5.317 21.728-15.767 28.288-18.975-.186-.548.261-.883-.562-.656"
        opacity="1"
      ></Path>
      <Path
        fill="url(#linearGradient3143)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M378.198 270.745s113.445-49.02 132.353-55.322c18.907-6.303 105.742-26.61 108.543-26.61s-15.406 2.8-41.316 8.403c-25.91 5.602-104.342 21.008-128.152 31.512s-72.829 41.317-71.428 42.017"
        opacity="1"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="3"
        d="M493.602 181.557c4.3-.052 8.58.415 12.877.562 15.555.112-21.912.105-3.269.02 10.634-1.328 19.38-.227 29.225 1.898 4.31.547 8.646.905 12.97 1.343 18.848.297-17.614 1.395-3.674-.343 9.818-1.218 19.828-.683 29.669-.676 3.813.063 7.627.083 11.44.084-29.797 2.065-12.805-1.01-5.818-1.262 11.783-.14 22.346.79 8.535 1.517-3.7.192-7.405.26-11.11.297-9.491.043-18.983.02-28.475.02-4.221.025-8.42.126-12.608-.454-4.175-.908-8.41-1.397-12.65-1.876-6.904-1.038-26.173-.66 3.79-.626-4.062.142-8.021 1.025-12.078 1.27-3.86.235-7.716.497-11.584.565-9.862.084-19.725-.013-29.587-.037-3.915.954 22.464-.777 4.683.94-9.788.407-19.726 1.227-29.438-.198-4.109-.921-8.257-1.596-12.408-2.287-3.917-.746-7.87-1.193-11.827-1.655-4.007-.376-8.044-.372-12.035-.904-1.54.92-6.173-.022-5.164-1.504.142-.208 3.71-.924 4.33-.926 6.378-.025 12.754.126 19.13.189 23.405 1.853-16.779 1.433-4.01.814 10.932-2.552 18.747-.614 27.73 3.303h-16.95c-19.39-8.476 16.561.992 6.064-3.303-9.883.473-19.871.934-29.638-.814 39.154-.507-.823-.709 15.513 2.241 3.974.523 7.986.552 11.975.904 3.916.465 7.834.889 11.706 1.655 4.168.689 8.335 1.348 12.457 2.287 13.554 1.884-21.79.33-4.395.197 9.678-.831 19.276-1.975 29.072-.939 21.057.049-13.915.074-4.182.037 3.92-.068 7.828-.336 11.742-.564 4.035-.255 7.975-1.147 12.018-1.271 9.916-.01 20.02-.543 29.92.626 4.227.477 8.45.944 12.606 1.876 4.14.564 8.29.488 12.463.453-28.184.002-11.707.018-5.182-.02 3.732-.036 7.463-.103 11.19-.296 5.476-.29 35.716-2.851 25.328-1.517-9.488.35-18.163 3.877-28.08 1.262-3.803 0-7.605-.021-11.406-.084 30.187-.027 11.23-.432 4.287.676-9.987 1.247-20.108.91-30.138.343-4.353-.433-8.717-.8-13.055-1.343-6.881-1.455-24.81-3.743 4.529-1.899-10.15.045-20.3.138-30.45-.019-4.34-.14-8.663-.629-13.008-.562z"
        color="#000"
        opacity="0.57"
        visibility="visible"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M541.709 274.1c-6.087.319-11.334 2.492-16.5 3.781-10.162 2.536-19.556 9.45-30.844 27.25-7.52 11.858-11.136 22.15-15.312 34.032-4.177 11.88-17.483 44.496-29.88 61.832l12.067-17.582c9.809-18.464 14.574-32.057 18.75-43.938s7.761-22.053 15.219-33.812c11.217-17.688 20.329-24.345 30.219-26.813 8.428-2.103 16.514-6.32 27.906-1.781l.375-.938c-4.404-1.754-8.348-2.222-12-2.03"
        opacity="0.57"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M539.709 274.1c-6.087.319-11.334 2.492-16.5 3.781-10.162 2.536-19.556 9.45-30.844 27.25-7.52 11.858-11.136 22.15-15.312 34.032-4.177 11.88-17.483 44.496-29.88 61.832l12.067-17.582c9.809-18.464 14.574-32.057 18.75-43.938s7.761-22.053 15.219-33.812c11.217-17.688 20.329-24.345 30.219-26.813 8.428-2.103 16.514-6.32 27.906-1.781l.375-.938c-4.404-1.754-8.348-2.222-12-2.03"
        opacity="0.57"
      ></Path>
      <Path
        fill="#fff"
        fillOpacity="0.585"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m521.915 176.447.879 3.165 4.396-1.934 5.099-2.99 9.495-3.34-8.088 2.11s-1.803-1.67-3.517-1.583c-1.714.088-3.34 1.934-3.34 1.934l-1.76 1.231-2.11.528z"
      ></Path>
      <Path
        fill="url(#linearGradient4244)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m381.466 168.592.615 2.693 3.86-1.454 4.51-2.313 8.302-2.437-7.04 1.458s-1.473-1.473-2.949-1.466-2.954 1.495-2.954 1.495l-1.564.965-1.836.362z"
      ></Path>
      <Path
        fill="none"
        fillOpacity="0.585"
        fillRule="evenodd"
        stroke="url(#linearGradient4429)"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="0.51"
        d="M410.03 166.48s38.047-6.864 74.78 2.644"
        opacity="0.683"
      ></Path>
      <Path
        fill="#131313"
        fillOpacity="0.726"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m522.794 182.25 4.923.527.176-1.407 1.583-1.758 2.11-1.231 2.11-1.407s-5.1 3.341-6.155 3.869c-1.055.527-4.044.527-4.044.527z"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="m723.74 283.288-137.562 75 .5.875 136.754-75.777z"
        opacity="0.339"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M530.446 184.725c-1.411-.126-2.826-.291-4.196-.662-1.23-.451-2.43-.966-3.753-.994 5.913-.49-1.05.565 3.058 1.3 4.19.368-6.935-.283 4.285.116 3.508.248-2.003-.122-3.12-.313-1.817-.205-7.84-.133.05-.192 4.677.346-2.406.562 1.318-.023-5.266-1.832 2.054-1.1-.767-.73-2.205.144-.84 1.153.498 1.294.205.002.82.009.615.008-5.628-.023-.873-.09.436-.283l3.177.456c-2.45.356-4.941.47-7.414.272-1.49-.317-2.808-2.09-.454-2.195 2.297-.422 6.052-1.036 7.068 1.625-2.497.44-5.258.708-7.668-.112 2.264-.671 4.013-.941 6.325-.557 4.355 1.07-.963 1.693-3.23 1.24-4.508-.163 8.013.178-4.263-.184-4.59-1.393 2.195-3.805 3.266-2.207 1.311.128 2.507.654 3.752 1.056 1.369.325 2.767.5 4.168.616z"
        color="#000"
        opacity="0.483"
        visibility="visible"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M524.95 182.287c4.12 1.935-1.441.964.103.724 1.386-.267 2.747-.649 4.111-1.012.533-.052-2.132-.209-1.596-.193 2.505.076 3.336-.083 1.578.158-4.198.723 4.948.855-1.933.745 1.808-.16 3.556-.678 5.295-1.169 2.076-.562 4.11-1.253 6.064-2.151.7-.426 4.358-2.043 2.6-2.358-.261-.021-1.043-.067-.782-.064 4.848.054.59.504-.905 1.047-1.41.548-2.754 1.242-4.149 1.823-.962.685-3.988 1.211-1.246 1.12-5.1.419 1.043-1.277 2.376-1.893 1.397-.717 2.815-1.385 4.234-2.056 5.794.206-1.599 1.769-3.23 2.364-2.718 1.215-4.564 1.851-7.476 1.267 2.394-.492 4.71-1.302 7.066-1.95 2.082-.565 4.192-1.015 6.294-1.497 4.947.773.348 1.7-1.275 2.262-6.025-.522 1.417-1.5 3.016-1.896 1.868-.452 3.705-1.024 5.575-1.467 3.861.147 3.044 1.097.204 1.469-1.783.17-3.566.34-5.348.528-5.14-.237-2.368-.85.289-1.312 1.872-.291 3.722-.7 5.588-1.025.856-.656 6.48-.027 4.295.128-1.734.231-3.442.62-5.16.941-2.15.418-4.321.698-6.492.976l-3.116-.454c2.181-.258 4.362-.524 6.517-.952 1.702-.323 3.391-.711 5.102-.983 3.728-.363 6.199.586 1.995.789-1.883.302-3.745.72-5.63 1.016-1.333.232-7.944 1.6-6.54.41 1.784-.171 3.566-.353 5.35-.523 1.196-.128 8.42-1.612 6.13-.575-1.927.4-3.812.97-5.724 1.439-3.143.795-5.939 1.748-9.248 1.084 2.692-.811 4.533-2.055 7.631-1.424-2.152.452-4.307.899-6.434 1.462-2.315.627-4.587 1.398-6.903 2.016-7.7-.699-1.08-.628 1.283-2.098 3.293-1.214 5.743-2.524 9.403-1.636-1.432.671-2.86 1.348-4.274 2.055-2.897 1.323-5.273 2.364-8.647 2.018-2.848-.37.134-1.584 1.272-1.967 1.374-.625 2.735-1.28 4.135-1.843 2.566-.947 5.157-1.773 7.963-.935 1.627 1.475-1.414 2.238-2.636 3.048-1.952.917-3.987 1.626-6.066 2.2-1.728.496-3.456 1.025-5.245 1.256-.722 0-8.191.222-4.349-1.68 1.204-.224 7.455-.805 6.285.889q-2.014.602-4.07 1.048c-1.716.353-5.692 1.098-6.486-1.226z"
        color="#000"
        opacity="0.483"
        visibility="visible"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="1"
        fillRule="nonzero"
        stroke="none"
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeWidth="1"
        d="M381.433 173.918c4.05-.378 8.128-.477 12.191-.4 2.483.43 4.991.786 7.404 1.537-.187.95-1.749.264-2.497.477-3.25-.088-6.512-.37-9.69-1.055-1.366-.606.551-1.07 1.205-1.05 4.045-.815 8.124-1.513 12.085-2.689-.51.264-2.153.43-1.591 1.192 1.106.24 2.257.056 3.375-.008.723.04 2.569-.481 1.017-.817-1.072.02-2.118-.219-3.194-.199-1.186-.04-2.373-.041-3.56-.067 1.631-.862 3.543-.698 5.326-.796 2.626-.01 5.273.143 7.836.738.844.64-1.018.914-1.46.906-5.192.877-10.103 2.832-15.081 4.472-1.11.416-2.227.754-3.403.418l-7.893-1.006c3.52-.992 6.94-2.291 10.398-3.47 5.453-1.742 11.239-2.905 16.977-2.232.815.217 2.74.103 2.502 1.31-.84.637-1.993.636-2.994.85-3.697.488-7.435.181-11.144.03-1.457-.098-2.917-.258-4.338-.61-.837-.983 1.152-1.046 1.777-1.206 3.453-.554 7.002-.511 10.451.039 1.417.282 2.896.648 4.084 1.488-.38.774-1.967.572-2.777 1.007-4.842 1.188-9.746 2.13-14.67 2.906-2.227.289-4.53.505-6.739.003-1.16-.942.744-1.546 1.516-1.682 2.82-.631 5.759-.513 8.611-.166 1.87.244 3.72.632 5.543 1.11-3.998.01-8 .027-11.987.348q-4.64-.69-9.28-1.378"
        color="#000"
        opacity="0.483"
        visibility="visible"
      ></Path>
    </G>
    <Path
      fill="none"
      fillOpacity="0.585"
      fillRule="evenodd"
      stroke="url(#linearGradient4378)"
      strokeDasharray="none"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeOpacity="1"
      strokeWidth="0.6"
      d="M554.972 172.403s43.783-10.199 87.038-.88"
      opacity="0.683"
    ></Path>
  </Svg>
);

export default Car;
