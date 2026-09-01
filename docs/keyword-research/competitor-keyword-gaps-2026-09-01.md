# PetTranslator competitor keyword gaps

**Checked:** September 1, 2026  
**Semrush dataset:** United States, desktop; report date August 31, 2026  
**Discovery rule:** monthly volume at least 100; KD 0-29  
**Method:** competitor organic rankings first, followed by PetTranslator title/slug/intent deduplication and a live US Google review (`gl=us`, English, personalization disabled) for the editorial shortlist  
**Competitor sections:** Dogster `/dog-behavior/`, Catster `/cat-behavior/`, and Whole Dog Journal `/behavior/`

## Decision

The competitor-first method found better gaps than a broad seed search. It also exposed several false positives: Semrush labels terms such as `cat sleeping positions`, `dog showing teeth`, and `why do dogs roll in poop` as low difficulty, but their current Google results contain several strong exact-intent pages. Those terms should not lead the next publishing sprint.

Six net-new intents pass the current demand, fit, cannibalization, source, and live-SERP screens. `Dog cobbing` is worth retaining as a second-tier opportunity, but its Google results are more competitive than its KD suggests.

This is a research queue, not authorization to publish during an indexing backlog. Recheck the backlog gate and refresh the SERP evidence before drafting.

## Raw topically relevant qualifying rows

These are exact Semrush query strings from the competitor reports. They have not been normalized into editorial titles. Close variants and terms later rejected are intentionally retained here.

| Competitor | Exact query | Volume | KD | Ranking page | Initial disposition |
|---|---|---:|---:|---|---|
| Catster | cat sleeping positions | 4.4K | 25 | `catster.com/cat-behavior/cat-sleeping-positions/` | Reject after SERP review |
| Catster | cat scream | 1K | 26 | `catster.com/cat-behavior/cat-screaming/` | Discovery only |
| Catster | annoyed cat | 1.3K | 27 | `catster.com/cat-behavior/do-cats-get-annoyed/` | Ambiguous/image intent |
| Catster | cat tail wagging meaning | 1.6K | 29 | `catster.com/cat-behavior/cat-tail-language-movements-meanings/` | Refresh existing tail guide |
| Catster | cat curled up | 1.6K | 26 | `catster.com/cat-behavior/why-do-cats-sleep-in-a-ball/` | Supporting variant only |
| Catster | cat about to pounce | 720 | 23 | `catster.com/cat-behavior/cat-pouncing/` | Discovery only |
| Catster | cat with smile | 1.3K | 26 | `catster.com/cat-behavior/can-cats-smile/` | Reject after SERP review |
| Catster | what do cats do all day | 720 | 19 | `catster.com/cat-behavior/what-do-cats-do-all-day/` | Weak product fit |
| Catster | why does my cat suck on blankets | 590 | 22 | `catster.com/cat-behavior/why-does-my-cat-lick-my-blanket/` | Discovery only |
| Catster | cat bite | 6.6K | 28 | `catster.com/cat-behavior/what-to-do-when-a-cat-bites-you/` | Medical/safety intent; reject |
| Catster | cat sitting positions | 720 | 21 | `catster.com/cat-behavior/why-do-cats-loaf/` | Ambiguous intent |
| Catster | cat smacking meaning | 480 | 21 | `catster.com/cat-behavior/why-do-cats-slap-and-swat/` | Variant of approved intent |
| Catster | cat ear meanings | 720 | 20 | `catster.com/cat-behavior/cat-ear-language/` | Refresh body-language hub |
| Catster | cat sleeping face down | 480 | 22 | `catster.com/cat-behavior/why-does-my-cat-sleep-face-down/` | Supporting variant only |
| Catster | why does my cat meow when i sneeze | 390 | 17 | `catster.com/cat-behavior/why-does-my-cat-meow-when-i-sneeze/` | Discovery only |
| Catster | why does my cat hug my arm | 390 | 14 | `catster.com/cat-behavior/why-does-my-cat-hug-my-arm/` | Discovery only |
| Catster | why do cats chase their tails | 1K | 20 | `catster.com/cat-behavior/why-is-cat-chasing-their-tail/` | Approved intent |
| Catster | why do cats like to be pet | 1K | 14 | `catster.com/cat-behavior/why-cats-like-to-be-petted/` | Possible overlap with petting content |
| Catster | resource guarding in cats | 170 | 8 | `catster.com/cat-behavior/cat-resource-guarding/` | Approved intent |
| Catster | cats mirroring behavior | 260 | 18 | `catster.com/cat-behavior/what-is-cat-mirroring/` | Mixed intent; discovery only |
| Catster | cat reaching out | 480 | 28 | `catster.com/cat-behavior/why-do-cats-reach-paws-out/` | Discovery only |
| Catster | sleeping cat with tongue out | 320 | 21 | `catster.com/cat-behavior/why-do-cats-stick-their-tongue-out-while-sleeping/` | Discovery only |
| Catster | reasons cats slap with their paws | 2.9K | 21 | `catster.com/cat-behavior/why-do-cats-slap-and-swat/` | Approved intent |
| Catster | pouncing cat | 880 | 27 | `catster.com/cat-behavior/cat-pouncing/` | Variant of pouncing intent |
| Dogster | why does my dog sit alone in another room | 170 | 23 | `dogster.com/dog-behavior/why-does-my-dog-sit-alone-in-another-room/` | Approved intent |
| Dogster | do dogs fake injuries | 320 | 22 | `dogster.com/dog-behavior/do-dogs-fake-injuries/` | Approved with safety framing |
| Dogster | why do dogs urinate on other dogs | 210 | 10 | `dogster.com/dog-behavior/why-does-dog-pee-on-other-dogs/` | Medical overlap; defer |
| Dogster | dog hump toy | 320 | 25 | `dogster.com/dog-behavior/dog-humping-toy/` | Discovery only |
| Dogster | why does my dog whimper in his sleep | 480 | 16 | `dogster.com/dog-behavior/why-do-dogs-whimper-in-their-sleep/` | Refresh sleep article |
| Dogster | why do dogs cross their paws | 260 | 23 | `dogster.com/dog-behavior/why-do-dogs-cross-their-paws/` | Approved intent |
| Dogster | why do dogs lick their nose | 720 | 23 | `dogster.com/dog-behavior/why-do-dogs-lick-their-noses/` | Refresh lip-licking article |
| Dogster | why do dogs lick your legs | 720 | 22 | `dogster.com/dog-behavior/why-does-my-dog-lick-my-legs/` | Discovery only |
| Dogster | why do dogs put their paw on you | 1.3K | 25 | `dogster.com/dog-behavior/why-does-dog-put-their-paw-on-me/` | Cannibalization check needed |
| Dogster | dog curled up sleeping | 320 | 28 | `dogster.com/dog-behavior/why-do-dogs-like-to-sleep-curled-up/` | Supporting variant only |
| Dogster | puppies eating their feces | 1.3K | 29 | `dogster.com/dog-behavior/why-puppies-eat-poop/` | Health-heavy; weak product fit |
| Dogster | why do dogs roll in poop | 2.9K | 23 | `dogster.com/dog-behavior/why-do-dogs-roll-in-poop/` | Reject after SERP review |
| Whole Dog Journal | scared dog | 8.1K | 25 | `whole-dog-journal.com/behavior/fear-aggression-in-dogs/` | Too broad; intent needs splitting |
| Whole Dog Journal | dog tail meaning | 2.4K | 17 | `whole-dog-journal.com/behavior/dog-tail-language/` | Refresh existing tail guide |
| Whole Dog Journal | puppy rage syndrome | 4.4K | 23 | `whole-dog-journal.com/behavior/idiopathic-aggression-in-dogs/` | High-risk medical topic; reject |
| Whole Dog Journal | why do dogs lick your feet | 4.4K | 27 | `whole-dog-journal.com/behavior/why-do-dogs-lick-your-feet/` | Discovery only |
| Whole Dog Journal | flehmen response dog | 1K | 17 | `whole-dog-journal.com/behavior/flehmen-response-in-dogs/` | Medium live competition |
| Whole Dog Journal | panting dog | 3.6K | 14 | `whole-dog-journal.com/behavior/excessive-panting-in-dogs/` | Medical triage intent; defer |
| Whole Dog Journal | how do dogs communicate with each other | 1K | 26 | `whole-dog-journal.com/behavior/how-do-dogs-communicate-with-each-other-each-other/` | Overlaps dog body-language hub |
| Whole Dog Journal | do dogs remember people | 1.6K | 22 | `whole-dog-journal.com/behavior/do-dogs-remember-people/` | Discovery only |
| Whole Dog Journal | dog cobbing | 1.9K | 18 | `whole-dog-journal.com/behavior/cobbing-in-dogs/` | Second-tier opportunity |
| Whole Dog Journal | dog predation | 320 | 20 | `whole-dog-journal.com/behavior/understanding-highly-predatory-dogs/` | Safety-heavy; defer |
| Whole Dog Journal | dog showing teeth | 880 | 22 | `whole-dog-journal.com/behavior/why-do-dogs-show-their-teeth/` | Reject after SERP review |
| Whole Dog Journal | why does my dog lick the couch | 1K | 26 | `whole-dog-journal.com/behavior/why-does-my-dog-lick-the-couch/` | Crowded SERP; defer |
| Whole Dog Journal | why is my dog's tail down | 480 | 24 | `whole-dog-journal.com/behavior/why-is-my-dogs-tail-down/` | Refresh existing tail guide |
| Whole Dog Journal | why do dogs wink | 720 | 23 | `whole-dog-journal.com/behavior/why-do-dogs-wink/` | Medium live competition |
| Whole Dog Journal | what to do with a dog that bites their owner | 480 | 28 | `whole-dog-journal.com/behavior/what-to-do-with-a-dog-that-bites-their-owner/` | Safety topic; reject for now |
| Whole Dog Journal | can dogs be racist | 1K | 20 | `whole-dog-journal.com/behavior/could-my-dog-be-racist/` | Ambiguous and sensitive; reject |

## Deduplicated editorial queue

### 1. Reasons cats slap with their paws

- **Primary query:** `reasons cats slap with their paws`; supporting natural variant: `why do cats slap with their paws`
- **Semrush:** 2.9K volume, KD 21
- **Intent:** Explain swatting directed at people or other cats, distinguish play, distance-increasing behavior, overstimulation, fear, frustration, and pain, then give a safe response plan.
- **US Google evidence:** Quora and Reddit/other social discussions rank alongside The Spruce Pets, Adopt a Pet, Catster, and a smaller raw-food publisher. The result set mixes “slap me,” “tap me,” and “slap another cat,” so no single page cleanly resolves the full intent.
- **Competition classification:** Very low. Several exact pages exist, so it is not “zero competition,” but much of the first page is user-generated or split across narrower intents.
- **Authoritative-source availability:** Moderate to strong. Use feline behavior and handling guidance from AAFP/ISFM, International Cat Care, Ohio State's Indoor Pet Initiative, and credentialed veterinary behavior sources. Community posts can inform examples only.
- **Cannibalization:** Distinct from `cat-play-aggression`, `cat-overstimulation-signs`, and `cats-playing-or-fighting` if the page is framed as a decision tree for a single swat/swat sequence rather than another aggression overview.
- **Internal-link donors:** `cat-body-language`, `cat-play-aggression`, `cat-overstimulation-signs`, `cats-playing-or-fighting`, `cat-petting-aggression` intent within the overstimulation page.
- **Freshness risk:** Low; annual evidence and link review.
- **Confidence:** High.

### 2. Do dogs fake injuries?

- **Primary query:** `do dogs fake injuries`
- **Semrush:** 320 volume, KD 22
- **Intent:** Answer whether learned attention-seeking can resemble an injury while making “rule out pain first” the non-negotiable safety message.
- **US Google evidence:** The first page is dominated by an ecommerce supplement blog, Reddit, a greyhound adoption organization, another pet-store blog, Yahoo lifestyle, Instagram, Quora, and JustAnswer. It lacks a strong veterinary page that separates operant learning from pain or neurologic disease.
- **Competition classification:** Very low.
- **Authoritative-source availability:** Strong for canine pain signs, lameness, and learning theory; limited for the anthropomorphic phrase “fake injury.” The article must reframe the claim and never teach owners to dismiss limping or pain.
- **Cannibalization:** No current page answers this intent. It can complement `pain-signals-in-older-dogs`, `senior-dog-behavior-changes`, and `is-my-dog-depressed` without duplicating them.
- **Internal-link donors:** `pain-signals-in-older-dogs`, `dog-body-language`, `senior-dog-behavior-changes`, `online-dog-behaviorist-guide`.
- **Freshness risk:** Medium because pain and veterinary triage guidance must remain current.
- **Confidence:** High if medically reviewed; do not publish as a casual novelty post.

### 3. Why do cats chase their tails?

- **Primary query:** `why do cats chase their tails`
- **Semrush:** 1K volume, KD 20
- **Intent:** Separate ordinary play and kitten behavior from boredom, skin irritation, pain, compulsive behavior, and feline hyperesthesia warning signs.
- **US Google evidence:** A rescue-vet Q&A and Cats.com rank among Reddit, Facebook, Catit, JustAnswer, and TheCatSite. The SERP is heavily community and commercial, with only one concise veterinary Q&A near the top.
- **Competition classification:** Very low.
- **Authoritative-source availability:** Strong for tail pain, dermatologic causes, compulsive behavior, and feline hyperesthesia; moderate for benign play explanations.
- **Cannibalization:** Distinct from `cat-tail-meanings`, which interprets tail position and movement. Link between the two instead of folding chase behavior into the tail chart.
- **Internal-link donors:** `cat-tail-meanings`, `cat-play-aggression`, `cat-stress-signs`, `why-is-my-cat-acting-weird`.
- **Freshness risk:** Medium because medical red flags and terminology need periodic review.
- **Confidence:** High.

### 4. Why do dogs cross their paws?

- **Primary query:** `why do dogs cross their paws`
- **Semrush:** 260 volume, KD 23
- **Intent:** Explain that a relaxed crossed-paw resting pose has no single proven emotional meaning, then distinguish it from crossing while walking, weakness, pain, or coordination problems.
- **US Google evidence:** Reddit, Facebook, and Quora occupy prominent positions. Dogster and Parade Pets are the main exact editorial answers; Inverse offers a science angle, while JustAnswer addresses abnormal gait. The results repeatedly overstate a precise “meaning.”
- **Competition classification:** Very low.
- **Authoritative-source availability:** Limited for claims about the normal pose's emotional meaning, but strong for gait and lameness red flags. The evidence gap is the article's differentiator.
- **Cannibalization:** Distinct from `dog-paw-lift-meaning`, which covers a lifted paw. The new page should explicitly compare crossed resting paws with paw lifting and knuckling.
- **Internal-link donors:** `dog-paw-lift-meaning`, `dog-body-language`, `dog-stiff-body-language`, `pain-signals-in-older-dogs`.
- **Freshness risk:** Low for the behavior explanation; medium for veterinary triage details.
- **Confidence:** High with conservative wording.

### 5. Why does my dog sit alone in another room?

- **Primary query:** `why does my dog sit alone in another room`
- **Semrush:** 170 volume, KD 23
- **Intent:** Help owners distinguish ordinary rest, temperature/noise preferences, and learned routine from sudden withdrawal linked to pain, fear, cognitive change, or illness.
- **US Google evidence:** Reddit ranks first, followed by a small commercial blog and Dogster. WagWalking and JustAnswer cover symptom questions; Quora, Facebook, a forum, and an off-intent “why dogs follow you” article fill much of the rest.
- **Competition classification:** Very low.
- **Authoritative-source availability:** Strong for sudden behavior change, pain, sensory change, cognitive dysfunction, and veterinary triage. Evidence is weaker for assigning a single emotional reason to ordinary solitude.
- **Cannibalization:** Distinct from `is-my-dog-depressed` and `dog-separation-anxiety`; the query is about choosing solitude while the owner is home, not distress when left.
- **Internal-link donors:** `is-my-dog-depressed`, `senior-dog-behavior-changes`, `pain-signals-in-older-dogs`, `dog-pacing-at-night`.
- **Freshness risk:** Medium because triage recommendations should be reviewed.
- **Confidence:** High.

### 6. Resource guarding in cats

- **Primary query:** `resource guarding in cats`
- **Semrush:** 170 volume, KD 8
- **Intent:** Identify quiet and overt guarding of food, resting spots, toys, litter boxes, doors, and people in single- and multi-cat homes, with environmental and force-free management steps.
- **US Google evidence:** Catster is the strongest exact page. The rest includes small cat blogs, a local pet business, an ecommerce publisher, Reddit/Facebook, a cat rescue, and a humane-society article. Strong veterinary and behavior organizations are notably absent from the top results.
- **Competition classification:** Very low.
- **Authoritative-source availability:** Strong for feline environmental needs, resource distribution, multi-cat tension, and aggression prevention; use AAFP/ISFM and credentialed feline behavior sources.
- **Cannibalization:** Net-new species intent. `dog-resource-guarding` is not a substitute, and the cat page should link to `multi-cat-litter-box-rules`, `cat-redirected-aggression`, and `cats-playing-or-fighting` rather than repeat them.
- **Internal-link donors:** `multi-cat-litter-box-rules`, `cat-redirected-aggression`, `cats-playing-or-fighting`, `cat-stress-signs`, plus a cross-species contextual link from `dog-resource-guarding` where useful.
- **Freshness risk:** Low; annual guideline review.
- **Confidence:** High.

### 7. Dog cobbing

- **Primary query:** `dog cobbing`; supporting variants include `corn cobbing dog` and `cobbing dog`
- **Semrush:** 1.9K volume, KD 18
- **Intent:** Explain gentle front-teeth nibbling, context, body-language combinations, when to redirect, and skin/dental/pain red flags.
- **US Google evidence:** Spark Paws, Whole Dog Journal, Adopt a Pet, Rover, a breeder site, and a veterinary clinic all have exact or near-exact pages. This is a much fuller SERP than the KD implies.
- **Competition classification:** Medium, not a low-competition priority.
- **Authoritative-source availability:** Moderate. Scientific and veterinary sources discuss grooming, oral behavior, itch, pain, and displacement, but may not use the internet term “cobbing.”
- **Cannibalization:** Distinct from `dog-lip-licking` and `dog-displacement-behaviors`, though both are useful donors.
- **Internal-link donors:** `dog-body-language`, `dog-displacement-behaviors`, `dog-lip-licking`, `signs-your-dog-is-stressed`.
- **Freshness risk:** Low.
- **Confidence:** Medium. Keep in reserve until the six weaker SERPs above are covered.

## Refresh and consolidation targets

Do not create separate pages for these phrases yet:

| Query family | Existing destination | Action |
|---|---|---|
| cat tail wagging meaning; cat tail signs | `cat-tail-meanings` | Expand contextual wagging/flicking coverage and examples. |
| cat ear meanings; cat ear position meaning | `cat-body-language` and `cat-airplane-ears` | Strengthen the ear-position section and clarify which intent each page owns. |
| dog tail meaning; dog tail down | `dog-tail-position-chart` | Add down/tucked distinctions and pain/context caveats. |
| why do dogs lick their nose | `dog-lip-licking` | Add nose-licking wording and normal moisture/grooming distinctions. |
| why does my dog whimper in his sleep | `dog-barking-in-sleep` | Broaden the sleep-vocalization section rather than launch a thin sibling page. |
| how do dogs communicate with each other | `dog-body-language` | Improve dog-to-dog communication coverage and internal links. |
| cat sleeping face down; cat curled up | Future `cat sleeping positions` cluster only | Do not publish separate position pages; the head term is currently too competitive. |

## Rejected false positives

| Query | Semrush | Why rejected now |
|---|---:|---|
| cat sleeping positions | 4.4K / KD 25 | PetMD, a peer-reviewed paper, Purina, and several exact editorial guides already satisfy the query. |
| dog showing teeth | 880 / KD 22 | WebMD, The Spruce Pets, Rover, Adopt a Pet, and training sites produce a crowded exact-intent SERP. |
| why do dogs roll in poop | 2.9K / KD 23 | PetMD, Chewy, BBC, Hill's, and several exact articles make this materially harder than KD suggests. |
| can cats smile | 1.3K / KD 26 | PetMD, Purina, Rover, Science Focus, and veterinary publishers already cover the intent. |
| why does my dog lick the couch | 1K / KD 26 | AKC, The Spruce Pets, Rover, Dogtopia, and other exact pages crowd the results. |
| puppy rage syndrome | 4.4K / KD 23 | High-risk neurologic/aggression topic with weak product fit and a high bar for medical review. |

## Recommended order after the indexing gate reopens

1. Reasons cats slap with their paws
2. Do dogs fake injuries?
3. Why do cats chase their tails?
4. Why do dogs cross their paws?
5. Why does my dog sit alone in another room?
6. Resource guarding in cats

Before drafting each page, refresh its top-10 evidence, inspect useful public discussions for audience questions, build the full verified research brief, and confirm four natural contextual inbound donors still exist.
