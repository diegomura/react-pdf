/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import ReactPDF from '@react-pdf/node';
import { Document, Page, Text } from '@react-pdf/core';

const doc = (
  <Document>
    <Page wrap>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices
        cursus placerat. Nulla et enim non justo viverra dictum. Aliquam urna
        dui, fringilla id condimentum ac, viverra et velit. Proin porta leo nec
        feugiat ullamcorper. Vestibulum mauris enim, gravida vitae pharetra in,
        porttitor eu tortor. Nam lacinia urna leo, eu placerat mauris posuere
        et. Suspendisse vitae mi sed ligula sagittis elementum. Etiam sit amet
        sem scelerisque, maximus dui eget, lobortis turpis. Fusce eu ornare sem,
        a viverra mauris. Proin in neque at enim pellentesque ornare. Phasellus
        tempor lorem et suscipit finibus. Integer quis odio sollicitudin sem
        ultricies ultricies. Nunc et magna vitae elit aliquet ultrices.
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Donec vehicula pretium enim sed dictum.
        Phasellus efficitur eget massa et elementum. Nulla dapibus scelerisque
        laoreet. Etiam auctor at est ornare sollicitudin. Donec volutpat
        sagittis dui, et auctor eros. Vivamus vel iaculis nisl. Duis
        sollicitudin eget massa ac varius. Aenean ullamcorper lacus id iaculis
        maximus. Curabitur eget risus lorem. Donec mattis auctor laoreet.
        Suspendisse aliquam eros velit, vitae rhoncus arcu rutrum a. Vestibulum
        pretium gravida quam sit amet scelerisque. Aliquam quis felis vitae erat
        placerat aliquam. Ut elementum ultrices sapien, non consequat justo
        suscipit quis. Nullam eget velit porta, tempor mi vitae, luctus erat.
        Nullam vestibulum metus sed sagittis consequat. In hac habitasse platea
        dictumst. Donec interdum vitae nisl sed tincidunt. Vivamus aliquet leo
        eget turpis rhoncus fermentum. Quisque ut porttitor lacus. Sed interdum
        et sem in porta. Suspendisse enim eros, ullamcorper vulputate tellus
        vel, dignissim pellentesque orci. Sed euismod libero ut nisi accumsan,
        ac scelerisque purus sagittis. Duis volutpat eleifend erat, tincidunt
        pretium nisl viverra nec. Fusce fermentum est lectus, vitae pulvinar
        orci varius non. Quisque vehicula massa lobortis consectetur sodales.
        Etiam at diam augue. Duis convallis molestie pulvinar. Nunc gravida
        imperdiet magna, vel cursus nibh imperdiet placerat. In eget elit
        tellus. Morbi sed diam lorem. Suspendisse vel vestibulum nulla, et
        gravida tortor. Curabitur et convallis sapien. Aenean rutrum metus sed
        tempus ornare. Cras dictum, eros eget iaculis rhoncus, lorem justo
        dictum metus, ut porta tortor leo eget tellus. Quisque laoreet arcu in
        mollis venenatis. Curabitur aliquet laoreet commodo. Sed aliquet a orci
        nec rutrum. Praesent aliquam porttitor mi eu lobortis. Fusce posuere,
        dui in efficitur auctor, dui ipsum imperdiet lacus, at rutrum tellus
        libero vitae turpis. Integer non molestie ligula. Suspendisse interdum
        semper mauris ut dignissim. Donec nibh erat, auctor eu tortor sit amet,
        ultrices egestas nulla. Nulla facilisi. Vestibulum fermentum feugiat
        sapien. Donec quis suscipit ipsum, sit amet pellentesque nibh. Nullam
        convallis molestie vehicula. Aenean a rhoncus tellus, vel tincidunt est.
        Cras tincidunt tellus metus, et rhoncus est semper quis. Proin
        condimentum sodales sapien. Cras eu condimentum arcu. Sed eget sapien
        porttitor, ultrices tortor nec, interdum magna. Etiam erat eros,
        molestie interdum lorem sit amet, hendrerit laoreet augue. Donec at
        velit ex. Morbi vitae ligula tortor. Etiam at quam et nibh interdum
        vulputate in at dolor. Phasellus vel augue ut ipsum fringilla ornare.
        Suspendisse sed sem a enim varius elementum. Vestibulum interdum urna
        odio, quis feugiat mauris cursus eu. Aliquam condimentum, turpis ac
        malesuada tincidunt, dolor sem tincidunt odio, in interdum lorem erat ac
        tortor. Sed nec mi quis quam pretium tincidunt eget ut mi. In cursus
        lobortis odio, nec consectetur nulla accumsan ac. Etiam convallis
        malesuada nunc non rhoncus. Ut gravida in mi in volutpat. Maecenas eget
        justo semper, dictum purus ac, varius felis. Quisque faucibus
        condimentum condimentum. Nam nec lacus rhoncus ligula semper pulvinar et
        ut lacus. Proin dignissim, sapien ut scelerisque vestibulum, velit urna
        ullamcorper odio, in tristique urna leo efficitur quam. Donec finibus
        varius rutrum. Aliquam sollicitudin nibh nec hendrerit aliquet. Nulla
        molestie efficitur ipsum, at vehicula massa dapibus in. Integer
        ultricies elit laoreet purus pulvinar, vel porttitor augue eleifend.
        Curabitur sodales congue massa vitae vestibulum. Cras vestibulum
        tincidunt molestie. Donec ac quam augue. In sit amet rhoncus risus.
        Mauris volutpat efficitur lorem ac vehicula. Fusce vestibulum erat ac
        sapien euismod accumsan. Cras porta nibh vitae tristique mollis. Etiam
        blandit rhoncus gravida.
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/output.pdf`);
