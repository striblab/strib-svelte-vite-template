<!-- 
@component
### ArticleBody component
This is a general workspace illustrating what an article body might look like if you use only the components included in this template.  
ArticleBody doesn't accept any props. All contents will need to be hand-placed by a designer directly inside this component.  
In this example, Grid and GridRow help establish the width of the article body's contents. 
Documentation included with those components and accessed by VSCode tooltip explains each component in greater detail.

#### State in this component
- innerWidth: int - pixel width of the viewport.
- isMobile: boolean - derived from innerWidth, true if less than 768 pixels
- isTablet: boolean - derived from innerWidth, true if between 768 pixels inclusive and 1024 pixels exclusive
- isDesktop: boolean - derived from innerWidth, true if greater than 1024 pixels inclusive

#### Using state in this component
You can use any of the three derived states to render different variants of a GridRow component reactively.
The following example uses a ternary to render an image edge-to-edge on mobile but inline otherwise.

#### Example
```svelte
  <GridRow
    variant={isMobile ? "fullBleed" : "inline"}
  >
    <Image
      src="https://arc.stimg.co/startribunemedia/4SPNT7DI36ANT2SOB5N5EJAIJU.jpg"
      alt="Descriptive alt text"
      caption="Caption tk tk tk"
    />
  </GridRow>
```
-->

<script>
  import Grid from "../Grid/Grid.svelte";
  import GridRow from "../Grid/_GridRow.svelte";
  import Subhead from "./_Subhead.svelte";
  import Paragraph from "./_Paragraph.svelte";
  import Image from "../Image/Image.svelte";
  import Gallery from "../Image/Gallery.svelte";
  import ScrollySection from "../Scrolly/ScrollySection.svelte";
  import StoryPause from "./_StoryPause.svelte";

  let innerWidth = $state(0);
  let isMobile = $derived(innerWidth < 768);
  let isTablet = $derived(innerWidth >= 768 && innerWidth < 1024);
  let isDesktop = $derived(innerWidth >= 1024);
</script>

<svelte:window bind:innerWidth />
<Grid additionalClasses={"gap-y-5"}>



  <GridRow variant="inline" additionalClasses={"gap-y-5"}>

<div class="block">

<div class="rt-Box flex items-center w-full gap-x-2 mb-2"><div class="rt-Box"><a role="link" data-testid="link-button" aria-label="More about Laura Yuen" class="flex Button_button__9QGZa link large-size w-fit h-fit Button_button-link__auMnb rounded-full ml-0" href="/author/laura-yuen/8127999"><div class="rt-Box flex items-center gap-0.5"><img alt="Columnist Icon" data-chromatic="ignore" loading="lazy" width="0" height="0" decoding="async" data-nimg="1" class="object-cover size-16 aspect-square pr-1" src="https://author-service-images-prod-us-east-1.publishing.aws.arc.pub/startribunemedia/4305b8ae-af61-455f-a4eb-5cb7e3c853e1.png" style="color: transparent;"></div></a></div><div class="rt-Box flex flex-col gap-y-0.5"><div class="rt-Box flex"><a role="link" data-testid="link-button" class="flex Button_button__9QGZa link large-size w-fit h-fit Button_button-link__auMnb" href="/author/laura-yuen/8127999"><div class="rt-Box flex items-center gap-0.5"><p data-testid="Laura Yuen" class="rt-Text !text-[.875rem] font-utility-label-bold-02 text-text-primary relative">By Laura Yuen</p></div></a></div><span class="rt-Text text-text-secondary font-utility-label-reg-02 mb-1 !text-[.875rem]">The Minnesota Star Tribune</span>
<span class="!text-[#666666]  !text-[.75rem] tracking-[1px] rt-Text font-utility-label-reg-caps-03 text-text-secondary">January 25, 2026</span></div></div>

</div>



<Paragraph>
They are leading student walkouts, delivering groceries to frightened families and checking in on friends who are no longer going to school.
</Paragraph>

<Paragraph>
Some are the children of undocumented immigrants, putting food on the table because their parents can’t risk leaving the house for work.
</Paragraph>

<Paragraph>
As President Donald Trump’s ICE crackdown intensifies in Minnesota, a new generation of activists is taking a stand and showing up for the immigrants in their lives in ways both big and small — much like the students who sat at segregated lunch counters in the 1960s or the teens who were politically awakened after school shootings.
</Paragraph>

<Paragraph>
Here are some of their stories:
</Paragraph>
</GridRow>

<GridRow variant="inline" additionalClasses={"md:w-[120%] md:ml-[-10%] pt-8"}>
    <Image
      src="https://arc.stimg.co/startribunemedia/PUIFGQS5BBGVTD3AIABEO4AFZQ.jpg?&amp;w=1080"
      alt="Ariel Jimenez, 17, said he found his courage to speak up about how ICE is reshaping families like his. The son of undocumented parents who are afraid to leave the house, he works to support the family."
      caption="Ariel Jimenez, 17, said he found his courage to speak up about how ICE is reshaping families like his. The son of undocumented parents who are afraid to leave the house, he works to support the family. (Renée Jones Schneider/The Minnesota Star Tribune)"
    />
</GridRow>

  <GridRow variant="inline" additionalClasses={"gap-y-5"}>
<Subhead>Ariel Jimenez, Roseville Area High School</Subhead>

<Paragraph>
How fast can a kid grow?
</Paragraph>

<Paragraph>
Ariel Jimenez is just 17. For more than six months last year, his father was detained by ICE, forcing Ariel to become the family breadwinner and court navigator.
</Paragraph>

<Paragraph>
Agents scooped up his dad early last summer after he went to work on a construction site. While in ICE custody, he called his only child, crying and apologizing over the phone.
</Paragraph>

<Paragraph>
“Don’t worry,” Ariel, a U.S. citizen, told his father. “We’re going to find a solution for us.”
</Paragraph>

<Paragraph>
His dad’s attorneys filed a lawsuit challenging his detention. Last month, a judge ruled that his father could be freed on bond while his immigration case works its way through the courts. It was Ariel who received the coldly worded email from the federal government that nonetheless filled him with joy: “The alien is ready for release.”It was Ariel who drove more than nine hours to a Nebraska detention center to pick up his dad.
</Paragraph>

<Paragraph>
Now back at home, his father is afraid to leave the house, terrified that he could get detained again. Ariel’s mom can’t work because of health problems. So Ariel recently got a job as a cook to support his parents. He stocks up on groceries at food shelves.
</Paragraph>

<Paragraph>
“People think just because I have my dad here, life is going to be easier,” he said. “But as a son of undocumented parents, it’s still a struggle.”
</Paragraph>

<Paragraph>
His mom and dad pray for him each time he leaves the house. He wishes he could just focus on his studies and be a kid: “I don’t feel safe. But I have to support my parents. I have no other choice.”
</Paragraph>

<Paragraph>
Ariel’s classmates at Roseville High School urged him to lead a student walkout protesting ICE’s actions. At first, he demurred, saying it wasn’t worth the risk of ICE showing up. But after the killing of Renee Good, he said, he found his courage. Ariel felt the backing of several hundred students and friends who joined him in the protest.
</Paragraph>

<Paragraph>
“We’re making some very good noise,” he said.
</Paragraph>


<StoryPause></StoryPause>
</GridRow>

<GridRow variant="inline" additionalClasses={"md:w-[120%] md:ml-[-10%]"}>
    <Image
      src="https://arc.stimg.co/startribunemedia/IXBJHDSP4ZGT5H6DXAI736VHYA.jpg?&amp;w=1080"
      alt="Ricaya Whitmore, a sophomore at Roosevelt High School in Minneapolis, believes immigration will be a defining cause for her generation. She wants to use her Spanish-language skills in a career that helps immigrants."
      caption="Ricaya Whitmore, a sophomore at Roosevelt High School in Minneapolis, believes immigration will be a defining cause for her generation. She wants to use her Spanish-language skills in a career that helps immigrants. (Renée Jones Schneider/The Minnesota Star Tribune)"
    />
</GridRow>

  <GridRow variant="inline" additionalClasses={"gap-y-5"}>


<Subhead>Ricaya Whitmore, Roosevelt High School</Subhead>

<Paragraph>
Ricaya Whitmore, 15, says school feels lonely and strangely quiet now, with so many classmates staying home in fear of being targeted by ICE. She’s in a Spanish language immersion program, which has been popular with Latino students. In one of Ricaya’s classes, now only eight of about 45 students typically show up.
</Paragraph>

<Paragraph>
Ricaya, who is white, says she’s been texting her friends of all races and ethnicities to make sure they’re OK. She’s gone shopping with her mom to buy groceries for families in need. She sees her family’s role as simply taking care of people who feel like their lives are being destroyed.
</Paragraph>

<Paragraph>
She was shocked that federal agents would go to her school, just a couple of miles from where Good was shot, release chemical irritants and tackle people to the ground, according to witnesses. The <a href="https://www.startribune.com/what-happened-when-border-patrol-agents-showed-up-at-minneapolis-roosevelt-high-school/601561137" target="_blank" rel="" title="https://www.startribune.com/what-happened-when-border-patrol-agents-showed-up-at-minneapolis-roosevelt-high-school/601561137" data-mrf-link="https://www.startribune.com/what-happened-when-border-patrol-agents-showed-up-at-minneapolis-roosevelt-high-school/601561137" cmp-ltrk="Article Links" cmp-ltrk-idx="0" mrfobservableid="65c24b7e-3e01-4a9a-ad96-067ab61cc2bf">clashes</a> with teachers and protesters led the district to cancel school for two days and offer students the option of online learning.
</Paragraph>

<Paragraph>
“If you hurt one person, it hurts all of us,” Ricaya said, her eyes brimming with tears. “We just want our neighbors to be safe, and we just want to help our friends.”
</Paragraph>
<StoryPause></StoryPause>

 </GridRow>

  <GridRow variant={isMobile ? "fullBleed" : "default"} additionalClasses={""}>
    <Image
      src="https://arc.stimg.co/startribunemedia/B2B6FHY4A5FRTPUJ2X7AKXMG2Y.jpg?&amp;w=1080"
      alt="Student activist Muno, photographed at Juxtaposition in Minneapolis, Minn., on Jan. 21, wants to hold onto normalcy but said, &ldquo;It's so hard. You just can't look away.&rdquo;"
      caption="Student activist Muno, photographed at Juxtaposition in Minneapolis, Minn., on Jan. 21, wants to hold onto normalcy but said, &ldquo;It's so hard. You just can't look away.&rdquo; (Renée Jones Schneider/The Minnesota Star Tribune)"
    />
  </GridRow>

  <GridRow variant="inline" additionalClasses={"gap-y-5"}>
<Subhead>Muno, Shakopee High School</Subhead>

<Paragraph>
Muno, 18, asked me to withhold her last name because of fear of retaliation. (Some of her fellow students received death threats after posting on social media about a school walkout that Muno helped lead.)
</Paragraph>

<Paragraph>
She shared three recent stories she can’t shake from her mind.
</Paragraph>

<Paragraph>
One: Craving carne asada, Muno pulls up to a taco shop in West St. Paul, where she spots a Latino boy about her age, sizing her up from the store window. He apparently is the store’s makeshift security guard, there to prevent ICE agents from entering. He unlocks the door to let Muno in and quickly locks it after her.
</Paragraph>

<Paragraph>
We’ve heard a lot of stories alleging ICE is racially profiling residents, but Muno says we don’t hear enough about how the current climate of fear forces people of color to profile strangers back. Even a teenager is expected to make split-second calculations, rooted in bias, to protect their family and their livelihood.
</Paragraph>

<Paragraph>
“I’m sorry you have to do this, all day and every day,” she tells the boy, then breaks down in her car and cries.
</Paragraph>

<Paragraph>
Two: Muno is getting ready to go to her friend’s house, where she and several girls plan to bake cinnamon rolls and post selfies on TikTok in their matching pajamas. Then her friend sends a warning to the group chat: ICE agents just detained a construction worker in her neighborhood.
</Paragraph>

<Paragraph>
It’s that juxtaposition of frivolity and fear that fills Muno’s day-to-day life. “I don’t want to stop being happy. I don’t want that normalcy being taken away. But it’s so hard. You just can’t look away.”
</Paragraph>

<Paragraph>
Three: Muno visits the memorial for Renee Good in Minneapolis, days after an ICE agent fatally shot the 37-year-old white mother of three. Muno sets down her flowers and her signs and pays her respects. Out of nowhere, a random Somali auntie reminds her to zip up her jacket and hands Muno a hot cup of tea. An older white man offers Muno food. This is the Minnesota she knows, the place that reared her and continues to protect its youth.
</Paragraph>

<Paragraph>
She said immigrants and their children won’t stop enduring or giving back to the state.
</Paragraph>

<Paragraph>
“Yes, ICE is still happening, but I still have dinner plans Friday. I still have band practice. I’m still going to college. I’m still making my parents proud.”
</Paragraph>
<StoryPause></StoryPause>

 </GridRow>

  <GridRow variant={isMobile ? "fullBleed" : "default"} additionalClasses={""}>
    <Image
      src="https://arc.stimg.co/startribunemedia/TKXDJLMGKJGLHFXGZ6EHMACWLU.jpg?&amp;w=1080"
      alt="Sofia Gonzalez, a senior at Como Park Senior High School in St. Paul, led a student walkout protest on Jan. 14, days after comforting a neighbor family targeted by ICE."
      caption="Sofia Gonzalez, a senior at Como Park Senior High School in St. Paul, led a student walkout protest on Jan. 14, days after comforting a neighbor family targeted by ICE. (Renée Jones Schneider/The Minnesota Star Tribune)"
    />
  </GridRow>

  <GridRow variant="inline" additionalClasses={"gap-y-5"}>
 
 
 <Subhead>Sofia Gonzalez, Como Park Senior High </Subhead>

<Paragraph>
Sofia Gonzalez, 17, says her Mexican-born father is stressed about being stopped by ICE, even though he’s a U.S. citizen. He carries his Social Security card and a picture of his passport everywhere.
</Paragraph>

<Paragraph>
She learned from social media that ICE agents had been spotted at a house in St. Paul. When Sofia checked the address, it dawned on her that it was the home across the street, where a Mexican mom and her two daughters live. Sofia and her mother knocked on their door. The family appeared shaken when they answered. The elder daughter, who is Sofia’s age, sobbed as Sofia gave her a hug.
</Paragraph>

<Paragraph>
Sofia and her mom invited the family to go to their house and share a meal. “We basically hid them,” she said. “It hit close to home because it <i>was</i> close to home.”
</Paragraph>

<Paragraph>
That’s why, on a blindingly bright, frigid afternoon a few days later, Sofia took a stand. In a stocking cap and neon vest, led her fellow students from Como Park on a protest march. The massive crowd chanted, “Renee Good!” and “No hate, no fear, immigrants are welcome here!” They jumped and cheered when they finally arrived on the State Capitol grounds.
</Paragraph>

<Paragraph>
It’s easy to feel hopeless, Sofia says, but speaking out lifts her spirits. She uses her voice because she knows so many others can’t.
</Paragraph>
<StoryPause></StoryPause>

 </GridRow>

  <GridRow variant={isMobile ? "fullBleed" : "default"} additionalClasses={""}>
    <Image
      src="https://arc.stimg.co/startribunemedia/Q5TQEWZJJJH2TFPMZGQIHSSENY.jpg?&amp;w=1080"
      alt="Shiya Murphy, a senior at Hopkins High School, participated in a recent student walkout. He says people in his Minneapolis neighborhood give him hope. &ldquo;We’re very loud in the way we make sure everyone is safe.&rdquo;  (Renée Jones Schneider/The Minnesota Star Tribune)"
      caption="Shiya Murphy, a senior at Hopkins High School, participated in a recent student walkout. He says people in his Minneapolis neighborhood give him hope. &ldquo;We’re very loud in the way we make sure everyone is safe.&rdquo; (Renée Jones Schneider/The Minnesota Star Tribune)"
    />
  </GridRow>

  <GridRow variant="inline" additionalClasses={"gap-y-5"}>

<Subhead>Shiya Murphy, Hopkins High School</Subhead>

<Paragraph>
Shiya Murphy’s home is surrounded by signs of ICE activity. The 18-year-old lives in a south Minneapolis neighborhood where the sounds of activists blowing their whistles or honking their car horns constantly pierce the winter quiet. While ICE supporters might describe those actions as agitators impeding investigations, Shiya has a different reaction. When he hears the whistles, he thinks: “Those are my neighbors keeping people safe.”
</Paragraph>

<Paragraph>
Shiya identifies as biracial Black, and his white mother worries he could be racially profiled while driving. She insists he keep his cell phone charged and makes him share his location with her. A male relative was recently pulled over by ICE after tracking agents’ whereabouts.
</Paragraph>

<Paragraph>
“Immoral” is the word the Hopkins senior uses to describe videos he’s seen of agents tackling and kicking people, separating families.
</Paragraph>

<Paragraph>
“I’ve always been careful around local police,” Shiya said, adding that it’s gotten scarier since Good’s killing. “That was a moment of realizing how out of control it’s gotten.”
</Paragraph>

<Paragraph>
Shiya was happy to do one small thing for a teen friend whose aunt owns a Mexican clothing store in Richfield. The aunt didn’t feel comfortable venturing out, so her nephew minded the store — and Shiya was right there with him, keeping him company.
</Paragraph>

<Paragraph>
“I wanted to make sure he was safe,” Shiya said. “He’s my friend.”
</Paragraph>
  </GridRow>

  <GridRow variant="inline" additionalClasses={"pt-6 italic"}>
<Paragraph>
<a href="https://link.email.startribune.com/join/7v1/signup-optin-sv-laura-yuen">Sign up here</a> to follow Laura’s columns by email.
</Paragraph>


  </GridRow>

</Grid>

<style>
  a {
    text-decoration-line: underline;
    text-decoration-color: #00854b;
    text-underline-offset: 2px;
  }

  a:hover {
    color: #00854b;
  }

  i {
 font-style: italic !important;
  }
</style>
