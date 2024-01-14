import { Rect, Svg, G, Path, Text, Tspan } from '@react-pdf/renderer';

const Svg1 = () => (
  <Svg width="400" viewBox="0 0 600 400">
    <Rect fill="#ffffff" x="0" y="0" width="600" height="400" rx="0" ry="0" />
    <Rect fill="none" x="10" y="10" width="580" height="375" />
    <Rect fill="none" x="10" y="10" width="580" height="375" />
    <G>
      <G transform="translate(10,10) scale(1 1)">
        <Path
          fill="#e1f3ef"
          d="M 289.97026371226053 42.00000302824253 A 146 146 0 1 1 267.8372206592401 43.69195721688695 L 290 188 A 0 0 0 1 0 290 188 Z"
          transform="translate(0,0)"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <Path
          fill="#725573"
          d="M 267.98153975936066 43.66986659525537 A 146 146 0 0 1 280.0229902761958 42.34129179149255 L 290 188 A 0 0 0 0 0 290 188 Z"
          transform="translate(0,0)"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <Path
          fill="#bad5d9"
          d="M 280.16865394863237 42.33138761277962 A 146 146 0 0 1 289.7972089290416 42.00014083643251 L 290 188 A 0 0 0 0 0 290 188 Z"
          transform="translate(0,0)"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </G>
      <G transform="translate(10,10) scale(1 1)" />
    </G>
    <G visibility="visible" transform="translate(10,10) scale(1 1)">
      <Path
        fill="none"
        stroke="#e1f3ef"
        strokeWidth="1"
        d="M 308.267200557376 363.4992347258824 C 303.267200557376 363.4992347258824 301.91032777309874 345.5504493561899 301.4580368450064 339.5675208996257 L 301.00574591691407 333.5845924430615"
      />
      <Path
        fill="none"
        stroke="#725573"
        strokeWidth="1"
        d="M 198.01149501227187 35 C 203.01149501227187 35 272.81601016149165 30.937240272462915 273.46856673763756 36.90164886971116 L 274.12112331378347 42.866057466959404"
      />
      <Path
        fill="none"
        stroke="#bad5d9"
        strokeWidth="1"
        d="M 279.1013042228135 12 C 284.1013042228135 12 284.70457992729905 30.088763774538094 284.905671828794 36.08539299828981 L 285.106763730289 42.08202222204153"
      />
      <G transform="translate(313,353)">
        <Text
          x="5"
          style={{
            fontSize: '11',
            fontWeight: 'bold',
            color: '#000000',
            fill: '#000000',
          }}
          y="16"
        >
          <Tspan
            x="5"
            y="16"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinejoin="round"
          >
            USD
          </Tspan>
          <Tspan x="5" y="16">
            USD
          </Tspan>
        </Text>
      </G>
      <G transform="translate(161,25)">
        <Text
          x="5"
          style={{
            fontSize: '11',
            fontWeight: 'bold',
            color: '#000000',
            fill: '#000000',
          }}
          y="16"
        >
          <Tspan
            x="5"
            y="16"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinejoin="round"
          >
            EUR
          </Tspan>
          <Tspan x="5" y="16">
            EUR
          </Tspan>
        </Text>
      </G>
      <G transform="translate(241,2)">
        <Text
          x="5"
          style={{
            fontSize: '11',
            fontWeight: 'bold',
            color: '#000000',
            fill: '#000000',
          }}
          y="16"
        >
          <Tspan
            x="5"
            y="16"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinejoin="round"
          >
            CHF
          </Tspan>
          <Tspan x="5" y="16">
            CHF
          </Tspan>
        </Text>
      </G>
    </G>
    <G>
      <Rect
        fill="none"
        rx="0"
        ry="0"
        x="0"
        y="0"
        width="8"
        height="8"
        visibility="hidden"
      />
    </G>
  </Svg>
);

export default Svg1;
