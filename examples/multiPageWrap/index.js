import React from 'react';
import ReactPDF, {
  Font,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '../../dist/react-pdf.es.js';

const content = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dictum, lacus a ullamcorper tristique, dui dolor tempor velit, a pretium justo felis eget velit. Donec posuere egestas ligula, a suscipit elit. Praesent fringilla lacus quis magna iaculis pulvinar. Curabitur id massa vitae neque tristique porta. Donec euismod fringilla nunc sit amet vulputate. Etiam vehicula tellus nec ex convallis, ac congue urna hendrerit. Phasellus sapien massa, euismod sed elit bibendum, tempus ornare turpis. Sed est eros, commodo vitae congue a, dictum sed enim. Suspendisse potenti. Proin sodales, diam id ullamcorper dapibus, velit enim fermentum dolor, faucibus varius massa risus ut urna. Sed semper molestie dolor ac lacinia. Donec faucibus tristique justo, iaculis aliquet urna imperdiet eu. Cras at velit quis odio vulputate hendrerit. Proin pretium purus vel nisi lobortis sagittis.

Suspendisse eget scelerisque ante. Vestibulum laoreet egestas odio, quis convallis tellus interdum in. Pellentesque et risus augue. Nunc enim mauris, suscipit ornare rutrum nec, rutrum ut dolor. Aenean tempus justo quis vulputate pharetra. Pellentesque purus diam, blandit non neque mollis, maximus suscipit metus. Nunc euismod arcu ligula, condimentum imperdiet felis vulputate id. Etiam ornare dignissim facilisis. Aliquam consequat metus erat, nec efficitur ligula sodales ullamcorper.

Praesent ultricies scelerisque consequat. Suspendisse potenti. Phasellus molestie, ante a blandit gravida, eros tortor interdum ex, quis porta arcu mi vel dui. Proin pellentesque cursus suscipit. Nulla consectetur ligula nec lectus gravida efficitur. Cras at diam lorem. Ut ac imperdiet nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed enim lectus, venenatis et dui id, laoreet maximus odio. Aliquam volutpat in mi nec pulvinar.

Vestibulum eleifend urna diam, sed pretium mi aliquet ut. Nullam ac dui consectetur, dictum nisl nec, fringilla turpis. Curabitur mollis tempor quam sed molestie. Nulla semper, tortor at efficitur tincidunt, arcu lorem suscipit ligula, ut lacinia purus nisl eu purus. Donec quam metus, vehicula in euismod ac, tincidunt mattis orci. Aenean odio ipsum, pretium eu ipsum et, cursus maximus lacus. In et eros suscipit, laoreet quam pharetra, mollis massa. In vel augue et nibh blandit mollis. Proin congue eros in metus interdum ultrices. Sed bibendum dui nisi, non mollis tellus imperdiet congue. Nulla nec scelerisque est. Sed suscipit, tortor eget fermentum bibendum, nisi dui sollicitudin sapien, a finibus tortor mi in elit. Donec consequat a mauris quis egestas. Proin id quam quam. Donec fringilla semper dictum. Etiam tellus tortor, vulputate quis posuere sit amet, fermentum at nibh.

In bibendum, magna et vehicula sollicitudin, mauris orci facilisis mi, nec accumsan diam orci at metus. Maecenas nulla erat, molestie non quam finibus, vulputate lacinia metus. Duis sollicitudin risus justo, interdum interdum risus gravida vel. Praesent imperdiet turpis vitae mi fermentum, at cursus dolor gravida. Cras non massa aliquet, interdum massa sit amet, iaculis felis. Mauris et ante nec justo imperdiet ultricies. Nullam pretium nisi eget nibh bibendum, vel maximus purus aliquet. Cras lectus elit, suscipit non nunc ut, ornare scelerisque elit.

Integer hendrerit turpis sed quam finibus, eget laoreet lorem dictum. Integer facilisis, mi id tincidunt hendrerit, justo nisi gravida lorem, in bibendum lacus eros egestas magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas id auctor diam, id pulvinar nunc. Sed bibendum augue ac lectus laoreet, aliquet mattis neque tincidunt. Nam id orci nec dolor cursus finibus at eget leo. Quisque dictum eros sed aliquet semper. Mauris ac porttitor ligula. Suspendisse volutpat blandit vehicula. Suspendisse dictum a nulla mollis consequat.

Suspendisse potenti. Proin ut mollis felis. Cras at neque id odio sagittis ornare eget vel lorem. Suspendisse potenti. Donec nulla odio, interdum non malesuada vel, blandit et dolor. Aenean scelerisque ligula in eros elementum condimentum vitae eu mauris. Curabitur eleifend imperdiet interdum. Suspendisse vel ligula fringilla, tincidunt nisl at, fringilla arcu. Proin mattis erat lacus, vel eleifend diam volutpat imperdiet. In ultrices id nisl ac semper. Sed pretium orci a tempor porttitor. Phasellus vulputate magna a lobortis tincidunt. Suspendisse gravida venenatis tortor a egestas. Suspendisse id vehicula ante, ut eleifend purus. Curabitur nulla libero, euismod in aliquam at, tempor quis risus.

Mauris quis risus quis nibh sagittis ullamcorper. Aenean in leo sed lorem lobortis efficitur vitae at felis. Duis sed lacus ac nisl fermentum sollicitudin ac a orci. Mauris nunc nisl, commodo et dignissim eu, venenatis quis ex. Etiam feugiat felis mauris, quis interdum tellus semper eu. Phasellus tortor magna, varius nec risus eu, aliquet mattis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Aenean et semper elit.

Proin gravida mauris vel nulla vehicula mollis. Integer in maximus leo. Vestibulum et lectus iaculis dolor vehicula tincidunt. Donec molestie eu lorem vel lacinia. Cras eget mi metus. Pellentesque sit amet facilisis leo, in pulvinar elit. Proin eleifend, felis a bibendum ornare, enim risus euismod enim, id faucibus erat ipsum nec neque. Aliquam elementum ligula ante, vitae scelerisque tellus congue eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque nec malesuada lorem. Nam vehicula pellentesque commodo.

Nullam cursus ipsum ac maximus euismod. Donec non mauris quam. Cras laoreet nisl eu libero finibus, eu dapibus arcu pretium. Nulla vel molestie nisl. Maecenas blandit sollicitudin porttitor. In hac habitasse platea dictumst. Mauris malesuada, arcu eget lobortis sollicitudin, justo mauris maximus purus, et rutrum arcu metus a mauris. Aenean et dapibus odio. Nam non lacinia nulla. Praesent ac lobortis nunc. Nullam at iaculis metus. Nam pretium dui ex, quis fermentum sem aliquet non. Vivamus bibendum velit sem, vel molestie ligula ultrices nec. Phasellus at mauris sed ipsum malesuada rutrum eget feugiat nunc. Aenean sagittis, diam at efficitur ornare, odio felis ornare arcu, non fermentum nulla mi a nisl.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer pharetra justo non venenatis mattis. Vivamus ac felis dolor. Vestibulum vulputate tortor eu tincidunt rutrum. Sed diam dui, gravida quis auctor id, faucibus vel sem. Nunc varius mi non arcu malesuada, eu fermentum est porttitor. Ut gravida commodo urna ut commodo. Cras dapibus magna eget ipsum pulvinar, id posuere lectus venenatis. Ut pellentesque, lorem a fringilla posuere, odio sem eleifend lorem, vitae sollicitudin turpis libero vel augue. Nam ipsum urna, semper vel mattis a, sagittis eget dolor. Suspendisse felis neque, accumsan quis justo at, iaculis ultrices libero. Mauris suscipit, metus ac hendrerit tempor, nisi elit egestas magna, id mattis felis nunc quis metus. Vestibulum dolor leo, vehicula in magna vitae, hendrerit porta tellus. Aenean vehicula dui sit amet lacus ornare, vitae tempor nisl blandit. Etiam efficitur varius aliquet.

Nullam cursus scelerisque nisi nec pellentesque. Donec a mi quam. Aliquam finibus convallis neque, quis faucibus dui pellentesque sit amet. Praesent elementum, tortor ut tincidunt vulputate, justo lacus ultrices mauris, ac porttitor velit augue quis sapien. Duis ut diam facilisis, pharetra dui et, tristique odio. Pellentesque tempor, mi id hendrerit vehicula, arcu ipsum ultrices ante, id fringilla mi leo et lectus. Phasellus eros nisl, maximus mollis dictum sit amet, pulvinar nec arcu. Phasellus eget aliquet orci. Nulla volutpat aliquet ex ut dictum. Nunc rhoncus ligula nisl, vitae commodo sapien volutpat ac.

Sed sit amet aliquet ante. In hac habitasse platea dictumst. Duis tincidunt ultricies viverra. Vestibulum a luctus est, eget fermentum ante. Suspendisse erat neque, ultricies pulvinar aliquam non, elementum ut eros. Nullam sagittis diam eu rutrum consectetur. Donec lacinia orci eu luctus cursus. Praesent ac viverra mauris. Aliquam vitae dictum quam, et feugiat eros. Etiam luctus ipsum eros, eu fermentum ligula egestas a. Mauris rhoncus ullamcorper tortor consectetur malesuada. Praesent vulputate, quam eget commodo eleifend, nunc arcu imperdiet est, at imperdiet est nibh nec magna. Integer hendrerit imperdiet elit at consequat. Nunc tincidunt blandit magna, at rhoncus ex fringilla a.

Cras vel orci sed enim sollicitudin eleifend. Mauris non convallis turpis, a placerat diam. Phasellus non nibh erat. Maecenas egestas tortor tortor, quis feugiat augue pretium et. Proin libero ex, scelerisque ac leo eget, dignissim molestie turpis. Maecenas nec auctor sem, eu ultrices magna. Proin at iaculis dui, a porttitor tellus. Nunc elit lorem, luctus ut accumsan at, scelerisque faucibus orci. Aenean a convallis mi. Pellentesque tristique neque non consequat interdum. Etiam porttitor non felis in commodo. Vivamus ultrices lacinia purus, vel suscipit dui hendrerit nec. Nam ac dignissim ligula. In tincidunt ante nec fermentum hendrerit.

Nullam eget ligula in orci pulvinar placerat. Proin enim sem, pharetra sed sapien quis, volutpat lobortis nisl. Aliquam malesuada, arcu quis cursus malesuada, lacus nisl placerat dui, quis tristique orci urna a neque. Etiam malesuada quam nulla, ut varius mauris imperdiet in. Ut vitae risus et sem commodo vehicula non eget quam. Duis urna leo, auctor vitae ornare at, euismod vel arcu. Proin posuere pellentesque lobortis. Nam massa neque, condimentum in scelerisque id, feugiat sit amet dui. Mauris semper metus id dui rhoncus, id auctor felis consectetur.

Quisque vitae felis sed sapien varius tincidunt. Donec malesuada tortor vitae nunc maximus, sit amet elementum arcu placerat. Etiam porttitor urna ut justo porta, non luctus velit tristique. Phasellus mattis tempor massa in malesuada. Donec ut condimentum orci, nec ultrices tellus. Nunc vel dignissim metus. Sed congue elit ac tortor aliquam, quis faucibus risus aliquet.

Nullam justo ipsum, ullamcorper et ultrices quis, vestibulum sit amet erat. Suspendisse iaculis placerat sapien. Quisque nec vestibulum ante. Sed in viverra ex. Pellentesque finibus molestie odio. Cras mattis libero a condimentum interdum. In sit amet nunc in velit consequat tempus. Suspendisse maximus justo nibh, sed tincidunt ipsum maximus at. Vestibulum imperdiet sapien quis ex accumsan finibus. Etiam accumsan commodo arcu vel pretium. Pellentesque et arcu vehicula, sagittis nisl non, scelerisque mauris. Quisque pulvinar viverra pretium. Nunc finibus et velit ac molestie. Integer iaculis a erat fringilla feugiat. Nam urna dolor, finibus at augue vitae, consectetur porta urna. Vestibulum id lacus a magna fermentum pulvinar.

Praesent non risus at ex suscipit pulvinar ac vel magna. In viverra porttitor imperdiet. Sed ornare justo porta enim mollis luctus. Ut a leo eu nisl iaculis posuere nec in ante. Nulla pharetra dolor et vestibulum condimentum. Donec blandit arcu ipsum, nec faucibus nisi fringilla vitae. Sed dui elit, scelerisque non sapien at, fermentum faucibus eros. Nam ac ligula at augue convallis maximus. Ut porta, ligula sit amet vehicula luctus, augue velit bibendum mauris, eget aliquet nisl tortor dictum neque. Ut tincidunt tempor porttitor. Sed gravida id neque et ullamcorper. Sed condimentum mattis viverra. Etiam a lobortis metus, in pretium arcu. Donec enim turpis, molestie non volutpat et, vestibulum quis nunc. Duis a velit ipsum. Duis gravida, nulla sed lobortis pharetra, odio leo consectetur neque, non congue nunc nunc et nisl.

Pellentesque justo dolor, maximus in mattis at, volutpat at risus. Suspendisse faucibus dolor vitae ante venenatis dignissim. Nunc bibendum lacus lacus, id malesuada erat faucibus non. Vivamus sit amet consectetur ex. Curabitur et ligula convallis, viverra mi quis, imperdiet neque. Suspendisse potenti. Mauris posuere mi in porta interdum. Duis facilisis est non arcu commodo faucibus. Quisque sodales nunc neque, eget mollis nisl sodales nec. Etiam tempus sit amet lacus et lobortis.

Fusce iaculis est faucibus, aliquet lacus id, imperdiet elit. In pretium eros sit amet tristique scelerisque. Pellentesque fermentum pharetra lectus vitae hendrerit. Quisque et ante ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas varius non velit et rhoncus. Donec luctus euismod libero ut laoreet. Quisque vestibulum, lacus sit amet dictum malesuada, purus lacus lacinia risus, vel rhoncus leo lectus vitae dui.

THE END
`;

/**
 * PDF styling
 */
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    paddingHorizontal: 50,
    paddingVertical: 50,
  },
  textWrapper: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: '10pt',
    fontFamily: 'Roboto',
  },
});

Font.register({
  family: 'Roboto',
  src: `${__dirname}/../pageWrap/fonts/Roboto-Regular.ttf`,
});

const doc = (
  <Document>
    <Page size={'A4'} style={styles.page} wrap={true}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{content}</Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/output.pdf`).then();
