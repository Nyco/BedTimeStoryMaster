"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Copy, Check, Sparkles, User, BookOpen, Users } from "lucide-react"

const FORM_OPTIONS = {
  // Child section
  childAge: [
    { value: "2-3", label: "2-3 ans" },
    { value: "4-5", label: "4-5 ans" },
    { value: "6+", label: "6+ ans" },
  ],
  duration: [
    { value: "3-4", label: "3-4 minutes" },
    { value: "5-6", label: "5-6 minutes" },
    { value: "7-8", label: "7-8 minutes" },
    { value: "9-10", label: "9-10 minutes" },
  ],
  // Story section
  world: [
    { value: "space", label: "Aventure spatiale" },
    { value: "forest", label: "Foret magique" },
    { value: "dinosaurs", label: "Dinosaures" },
    { value: "knights", label: "Chevaliers & chateaux" },
    { value: "cowboys", label: "Cowboys" },
    { value: "animals", label: "Animaux" },
  ],
  theme: [
    { value: "courage", label: "Courage" },
    { value: "friendship", label: "Amitie" },
    { value: "sharing", label: "Partage" },
    { value: "patience", label: "Patience" },
    { value: "confidence", label: "Confiance en soi" },
  ],
  tone: [
    { value: "calm", label: "Calme & apaisant" },
    { value: "happy", label: "Joyeux & heureux" },
    { value: "proud", label: "Fier & valorisant" },
    { value: "moral", label: "Petite lecon de vie" },
  ],
  challenge: [
    { value: "fear", label: "Peur (noir, solitude, inconnu)" },
    { value: "problem", label: "Probleme a resoudre" },
    { value: "danger", label: "Quelqu'un en danger" },
    { value: "misunderstanding", label: "Malentendu" },
    { value: "competition", label: "Competition" },
  ],
  // Characters section
  hero: [
    { value: "explorer", label: "Explorateur curieux" },
    { value: "dreamer", label: "Reveur timide" },
    { value: "adventurer", label: "Aventurier courageux" },
    { value: "thinker", label: "Penseur malin" },
    { value: "troublemaker", label: "Farceur espiegle" },
  ],
  villain: [
    { value: "mirror", label: "Le Reflet Sombre" },
    { value: "believer", label: "Le Croyant Fanatique" },
    { value: "chaos", label: "L'Agent du Chaos" },
    { value: "authority", label: "L'Autorite Corrompue" },
    { value: "nature", label: "La Force de la Nature" },
    { value: "none", label: "Pas de villain" },
  ],
  mentor: [
    { value: "animal", label: "Animal sage" },
    { value: "creature", label: "Creature magique" },
    { value: "friend", label: "Ami plus age" },
    { value: "object", label: "Objet parlant" },
    { value: "none", label: "Pas de mentor" },
  ],
  trickster: [
    { value: "silly", label: "Personnage rigolo" },
    { value: "chaos", label: "Chaos inattendu" },
    { value: "funny", label: "Malentendus droles" },
    { value: "magic", label: "Magie espiegle" },
    { value: "none", label: "Pas de trickster" },
  ],
}

type FormValues = {
  // Child section
  childAge: string
  duration: string
  // Story section
  world: string
  theme: string
  tone: string
  challenge: string
  // Characters section
  hero: string
  villain: string
  mentor: string
  trickster: string
}

function generateName(): string {
  const consonants = "bcdfghjklmnprstvz"
  const vowels = "aeiou"
  let name = ""
  for (let i = 0; i < 3; i++) {
    name += consonants[Math.floor(Math.random() * consonants.length)]
    name += vowels[Math.floor(Math.random() * vowels.length)]
  }
  return name.charAt(0).toUpperCase() + name.slice(1)
}

function getRandomOption<T>(options: T[]): T {
  return options[Math.floor(Math.random() * options.length)]
}

function generatePrompt(values: FormValues): string {
  const heroName = generateName()
  const mentorName = values.mentor !== "none" ? generateName() : null
  const tricksterName = values.trickster !== "none" ? generateName() : null

  const worldLabels: Record<string, string> = {
    space: "une aventure spatiale",
    forest: "une foret magique",
    dinosaurs: "un monde de dinosaures",
    knights: "un royaume de chevaliers et chateaux",
    cowboys: "le Far West des cowboys",
    animals: "un monde d'animaux parlants",
  }

  const heroLabels: Record<string, string> = {
    explorer: "un explorateur curieux",
    dreamer: "un reveur timide",
    adventurer: "un aventurier courageux",
    thinker: "un penseur malin",
    troublemaker: "un farceur espiegle",
  }

  const challengeLabels: Record<string, string> = {
    fear: "affronter ses peurs (le noir, la solitude, l'inconnu)",
    problem: "resoudre un probleme difficile",
    danger: "sauver quelqu'un en danger",
    misunderstanding: "clarifier un malentendu",
    competition: "relever un defi ou une competition",
  }

  const villainLabels: Record<string, string> = {
    mirror: "un reflet sombre partageant les competences et pouvoirs du heros",
    believer: "un fanatique convaincu de faire le bien en commettant le mal",
    chaos: "un nihiliste qui veut simplement voir le monde bruler",
    authority: "un leader oppressif utilisant le systeme pour ecraser les autres",
    nature: "une force primale imparable avec laquelle on ne peut pas raisonner",
    none: "",
  }

  const mentorLabels: Record<string, string> = {
    animal: "un animal sage",
    creature: "une creature magique",
    friend: "un ami plus age",
    object: "un objet parlant",
    none: "",
  }

  const tricksterLabels: Record<string, string> = {
    silly: "un personnage rigolo",
    chaos: "un agent du chaos inattendu",
    funny: "un createur de malentendus droles",
    magic: "un farceur magique espiegle",
    none: "",
  }

  const themeLabels: Record<string, string> = {
    courage: "le courage",
    friendship: "l'amitie",
    sharing: "le partage",
    patience: "la patience",
    confidence: "la confiance en soi",
  }

  const toneLabels: Record<string, string> = {
    calm: "calme et apaisante",
    happy: "joyeuse et heureuse",
    proud: "fiere et valorisante",
    moral: "avec une petite lecon de vie",
  }

  const ageContext =
    values.childAge === "2-3"
      ? "tres simple, avec des phrases courtes et repetitives"
      : values.childAge === "4-5"
        ? "adapte aux 4-5 ans, avec un vocabulaire accessible"
        : "adapte aux 6 ans et plus, avec plus de details et de nuances"

  const villainName = values.villain !== "none" ? generateName() : null

  let prompt = `Cree une histoire du soir pour un enfant de ${values.childAge} ans. L'histoire doit etre ${ageContext}.

**Duree de lecture** : ${values.duration} minutes

**Univers** : ${worldLabels[values.world]}

**Theme central** : ${themeLabels[values.theme]}

**Ton** : L'histoire doit etre ${toneLabels[values.tone]}

**Defi principal** : ${heroName} devra ${challengeLabels[values.challenge]}

---

**Personnages :**

**Heros** : ${heroName}, ${heroLabels[values.hero]}`

  if (villainName && villainLabels[values.villain]) {
    prompt += `

**Villain** : ${villainName}, ${villainLabels[values.villain]}`
  }

  if (mentorName && mentorLabels[values.mentor]) {
    prompt += `

**Mentor** : ${mentorName}, ${mentorLabels[values.mentor]}, guidera ${heroName}`
  }

  if (tricksterName && tricksterLabels[values.trickster]) {
    prompt += `

**Trickster** : ${tricksterName}, ${tricksterLabels[values.trickster]}`
  }

  prompt += `

---

**Structure narrative a suivre (Le Voyage du Heros simplifie) :**

**Acte 1 - Mise en place**
1. Monde ordinaire : La vie normale de ${heroName} avant tout changement
2. Appel a l'aventure : Quelque chose perturbe son quotidien${villainName ? ` (lie a ${villainName})` : ""}
3. Hesitation : ${heroName} doute ou a peur
4. Rencontre du mentor : ${mentorName ? `${mentorName} apparait pour l'aider` : "Une idee ou un courage interieur emerge"}
5. Passage du seuil : ${heroName} s'engage dans l'aventure

**Acte 2 - Transformation**
6. Epreuves et allies : ${heroName} decouvre ce nouveau monde${tricksterName ? `, rencontre ${tricksterName}` : ""}
7. Approche de la grotte : La tension monte${villainName ? ` face a ${villainName}` : ""}
8. Epreuve centrale : ${heroName} affronte ${villainName ? villainName : "son defi"}
9. Recompense : ${heroName} gagne quelque chose de precieux (sagesse, objet, confiance)
10. Chemin du retour : Le retour commence mais tout n'est pas fini

**Acte 3 - Resolution**
11. Resurrection : Dernier test prouvant la transformation de ${heroName}
12. Retour avec l'elixir : ${heroName} revient change et apporte de la valeur aux autres

---

**Conseils importants :**
- Focus sur la transformation interieure, pas seulement les evenements
- L'epreuve centrale doit etre emotionnellement forte
- Les enjeux doivent augmenter progressivement
- La fin doit apporter une vraie cloture emotionnelle`

  return prompt
}

// Random gradient directions for glassmorphism cards
const gradientDirections = [
  'bg-gradient-to-br',
  'bg-gradient-to-bl',
  'bg-gradient-to-tr',
  'bg-gradient-to-tl',
  'bg-gradient-to-r',
  'bg-gradient-to-l',
]

function getRandomGradient() {
  return gradientDirections[Math.floor(Math.random() * gradientDirections.length)]
}

export function StoryForm() {
  const [values, setValues] = useState<FormValues>({
    childAge: "",
    duration: "",
    world: "",
    theme: "",
    tone: "",
    challenge: "",
    hero: "",
    villain: "",
    mentor: "",
    trickster: "",
  })
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [gradients, setGradients] = useState<string[]>([])

  useEffect(() => {
    // Set random gradients for each section
    setGradients([getRandomGradient(), getRandomGradient(), getRandomGradient()])
    
    // Randomize on load
    setValues({
      childAge: getRandomOption(FORM_OPTIONS.childAge).value,
      duration: getRandomOption(FORM_OPTIONS.duration).value,
      world: getRandomOption(FORM_OPTIONS.world).value,
      theme: getRandomOption(FORM_OPTIONS.theme).value,
      tone: getRandomOption(FORM_OPTIONS.tone).value,
      challenge: getRandomOption(FORM_OPTIONS.challenge).value,
      hero: getRandomOption(FORM_OPTIONS.hero).value,
      villain: getRandomOption(FORM_OPTIONS.villain).value,
      mentor: getRandomOption(FORM_OPTIONS.mentor).value,
      trickster: getRandomOption(FORM_OPTIONS.trickster).value,
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const prompt = generatePrompt(values)
    setGeneratedPrompt(prompt)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const updateValue = (key: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Child Section */}
        <div className={`glass-strong rounded-2xl p-6 md:p-8 ${gradients[0]} from-[var(--gradient-green)]/5 to-transparent`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Enfant
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Child Age */}
            <div className="space-y-2">
              <Label htmlFor="childAge" className="text-sm font-medium text-foreground">
                Age
              </Label>
              <Select value={values.childAge} onValueChange={(v) => updateValue("childAge", v)}>
                <SelectTrigger id="childAge" className="glass border-border/50 h-12">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent className="glass-strong border-border/50">
                  {FORM_OPTIONS.childAge.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium text-foreground">
                Duree
              </Label>
              <Select value={values.duration} onValueChange={(v) => updateValue("duration", v)}>
                <SelectTrigger id="duration" className="glass border-border/50 h-12">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent className="glass-strong border-border/50">
                  {FORM_OPTIONS.duration.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className={`glass-strong rounded-2xl p-6 md:p-8 ${gradients[1]} from-[var(--gradient-blue)]/5 to-transparent`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-accent/10 text-accent">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Histoire
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* World */}
            <div className="space-y-2">
              <Label htmlFor="world" className="text-sm font-medium text-foreground">
                Univers
              </Label>
              <Select value={values.world} onValueChange={(v) => updateValue("world", v)}>
                <SelectTrigger id="world" className="glass border-border/50 h-12">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent className="glass-strong border-border/50">
                  {FORM_OPTIONS.world.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Theme */}
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-sm font-medium text-foreground">
                Theme
              </Label>
              <Select value={values.theme} onValueChange={(v) => updateValue("theme", v)}>
                <SelectTrigger id="theme" className="glass border-border/50 h-12">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent className="glass-strong border-border/50">
                  {FORM_OPTIONS.theme.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tone */}
            <div className="space-y-2">
              <Label htmlFor="tone" className="text-sm font-medium text-foreground">
                Ton
              </Label>
              <Select value={values.tone} onValueChange={(v) => updateValue("tone", v)}>
                <SelectTrigger id="tone" className="glass border-border/50 h-12">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent className="glass-strong border-border/50">
                  {FORM_OPTIONS.tone.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Challenge */}
            <div className="space-y-2">
              <Label htmlFor="challenge" className="text-sm font-medium text-foreground">
                Defi
              </Label>
              <Select value={values.challenge} onValueChange={(v) => updateValue("challenge", v)}>
                <SelectTrigger id="challenge" className="glass border-border/50 h-12">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent className="glass-strong border-border/50">
                  {FORM_OPTIONS.challenge.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Characters Section */}
        <div className={`glass-strong rounded-2xl p-6 md:p-8 ${gradients[2]} from-[var(--gradient-purple)]/5 to-transparent`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-[var(--gradient-purple)]/10 text-[var(--gradient-purple)]">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Personnages
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Hero */}
            <div className="space-y-2">
              <Label htmlFor="hero" className="text-sm font-medium text-foreground">
                Heros
              </Label>
              <Select value={values.hero} onValueChange={(v) => updateValue("hero", v)}>
                <SelectTrigger id="hero" className="glass border-border/50 h-12">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent className="glass-strong border-border/50">
                  {FORM_OPTIONS.hero.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Villain */}
            <div className="space-y-2">
              <Label htmlFor="villain" className="text-sm font-medium text-foreground">
                Antagoniste
              </Label>
              <Select value={values.villain} onValueChange={(v) => updateValue("villain", v)}>
                <SelectTrigger id="villain" className="glass border-border/50 h-12">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent className="glass-strong border-border/50">
                  {FORM_OPTIONS.villain.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mentor */}
            <div className="space-y-2">
              <Label htmlFor="mentor" className="text-sm font-medium text-foreground">
                Mentor
              </Label>
              <Select value={values.mentor} onValueChange={(v) => updateValue("mentor", v)}>
                <SelectTrigger id="mentor" className="glass border-border/50 h-12">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent className="glass-strong border-border/50">
                  {FORM_OPTIONS.mentor.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Trickster */}
            <div className="space-y-2">
              <Label htmlFor="trickster" className="text-sm font-medium text-foreground">
                Trickster
              </Label>
              <Select value={values.trickster} onValueChange={(v) => updateValue("trickster", v)}>
                <SelectTrigger id="trickster" className="glass border-border/50 h-12">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent className="glass-strong border-border/50">
                  {FORM_OPTIONS.trickster.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[var(--gradient-green)] via-[var(--gradient-blue)] to-[var(--gradient-purple)] hover:opacity-90 text-primary-foreground rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Generer le prompt
        </Button>
      </form>

      {generatedPrompt && (
        <div className="mt-10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Votre prompt :</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="glass border-border/50 hover:bg-secondary/50"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-[var(--gradient-green)]" />
                  Copie !
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copier
                </>
              )}
            </Button>
          </div>
          <div className="glass-strong rounded-2xl p-6 max-h-96 overflow-y-auto border-border/50">
            <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
              {generatedPrompt}
            </pre>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Copiez ce prompt et collez-le dans votre IA preferee (ChatGPT, Claude, Mistral...)
          </p>
        </div>
      )}
    </div>
  )
}
