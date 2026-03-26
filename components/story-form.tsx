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
import { Copy, Check, Sparkles } from "lucide-react"

const FORM_OPTIONS = {
  childAge: [
    { value: "2-3", label: "2-3 ans" },
    { value: "4-5", label: "4-5 ans" },
    { value: "6+", label: "6+ ans" },
  ],
  world: [
    { value: "space", label: "Aventure spatiale 🚀" },
    { value: "forest", label: "Forêt magique 🌲" },
    { value: "dinosaurs", label: "Dinosaures 🦖" },
    { value: "knights", label: "Chevaliers & châteaux 🏰" },
    { value: "cowboys", label: "Cowboys 🤠" },
  ],
  hero: [
    { value: "explorer", label: "Explorateur curieux" },
    { value: "dreamer", label: "Rêveur timide" },
    { value: "adventurer", label: "Aventurier courageux" },
    { value: "thinker", label: "Penseur malin" },
    { value: "troublemaker", label: "Farceur espiègle" },
  ],
  challenge: [
    { value: "fear", label: "Peur (noir, solitude, inconnu)" },
    { value: "problem", label: "Problème à résoudre" },
    { value: "danger", label: "Quelqu'un en danger" },
    { value: "misunderstanding", label: "Malentendu" },
    { value: "competition", label: "Compétition" },
  ],
  helper: [
    { value: "animal", label: "Animal sage" },
    { value: "creature", label: "Créature magique" },
    { value: "friend", label: "Ami plus âgé" },
    { value: "object", label: "Objet parlant" },
    { value: "none", label: "Pas d'aide (twist intéressant)" },
  ],
  funElement: [
    { value: "silly", label: "Personnage rigolo" },
    { value: "chaos", label: "Chaos inattendu" },
    { value: "funny", label: "Malentendus drôles" },
    { value: "magic", label: "Magie espiègle" },
    { value: "none", label: "Aucun" },
  ],
  theme: [
    { value: "courage", label: "Courage" },
    { value: "friendship", label: "Amitié" },
    { value: "sharing", label: "Partage" },
    { value: "patience", label: "Patience" },
    { value: "confidence", label: "Confiance en soi" },
  ],
  ending: [
    { value: "calm", label: "Calme & apaisant" },
    { value: "happy", label: "Joyeux & heureux" },
    { value: "proud", label: "Fier & valorisant" },
    { value: "moral", label: "Petite leçon de vie" },
  ],
}

type FormValues = {
  childAge: string
  world: string
  hero: string
  challenge: string
  helper: string
  funElement: string
  theme: string
  ending: string
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
  const mentorName = values.helper !== "none" ? generateName() : null
  const tricksterName = values.funElement !== "none" ? generateName() : null

  const worldLabels: Record<string, string> = {
    space: "une aventure spatiale",
    forest: "une forêt magique",
    dinosaurs: "un monde de dinosaures",
    knights: "un royaume de chevaliers et châteaux",
    cowboys: "le Far West des cowboys",
  }

  const heroLabels: Record<string, string> = {
    explorer: "un explorateur curieux",
    dreamer: "un rêveur timide",
    adventurer: "un aventurier courageux",
    thinker: "un penseur malin",
    troublemaker: "un farceur espiègle",
  }

  const challengeLabels: Record<string, string> = {
    fear: "affronter ses peurs (le noir, la solitude, l'inconnu)",
    problem: "résoudre un problème difficile",
    danger: "sauver quelqu'un en danger",
    misunderstanding: "clarifier un malentendu",
    competition: "relever un défi ou une compétition",
  }

  const helperLabels: Record<string, string> = {
    animal: "un animal sage",
    creature: "une créature magique",
    friend: "un ami plus âgé",
    object: "un objet parlant",
    none: "",
  }

  const funLabels: Record<string, string> = {
    silly: "un personnage rigolo",
    chaos: "du chaos inattendu",
    funny: "des malentendus drôles",
    magic: "de la magie espiègle",
    none: "",
  }

  const themeLabels: Record<string, string> = {
    courage: "le courage",
    friendship: "l'amitié",
    sharing: "le partage",
    patience: "la patience",
    confidence: "la confiance en soi",
  }

  const endingLabels: Record<string, string> = {
    calm: "calme et apaisante",
    happy: "joyeuse et heureuse",
    proud: "fière et valorisante",
    moral: "avec une petite leçon de vie",
  }

  const ageContext =
    values.childAge === "2-3"
      ? "très simple, avec des phrases courtes et répétitives"
      : values.childAge === "4-5"
        ? "adapté aux 4-5 ans, avec un vocabulaire accessible"
        : "adapté aux 6 ans et plus, avec plus de détails et de nuances"

  let prompt = `Crée une histoire du soir pour un enfant de ${values.childAge} ans. L'histoire doit être ${ageContext}.

**Univers** : ${worldLabels[values.world]}

**Héros** : ${heroName}, ${heroLabels[values.hero]}

**Défi principal** : ${heroName} devra ${challengeLabels[values.challenge]}`

  if (mentorName && helperLabels[values.helper]) {
    prompt += `

**Mentor/Aide** : ${mentorName}, ${helperLabels[values.helper]}, guidera ${heroName}`
  }

  if (tricksterName && funLabels[values.funElement]) {
    prompt += `

**Élément amusant** : Intègre ${funLabels[values.funElement]} avec le personnage ${tricksterName}`
  }

  prompt += `

**Thème central** : ${themeLabels[values.theme]}

**Ton de fin** : L'histoire doit se terminer de façon ${endingLabels[values.ending]}

---

**Structure narrative à suivre (Le Voyage du Héros simplifié) :**

**Acte 1 - Mise en place**
1. Monde ordinaire : La vie normale de ${heroName} avant tout changement
2. Appel à l'aventure : Quelque chose perturbe son quotidien
3. Hésitation : ${heroName} doute ou a peur
4. Rencontre du mentor : ${mentorName ? `${mentorName} apparaît pour l'aider` : "Une idée ou un courage intérieur émerge"}
5. Passage du seuil : ${heroName} s'engage dans l'aventure

**Acte 2 - Transformation**
6. Épreuves et alliés : ${heroName} découvre ce nouveau monde
7. Approche de la grotte : La tension monte
8. Épreuve centrale : ${heroName} affronte sa plus grande peur
9. Récompense : ${heroName} gagne quelque chose de précieux (sagesse, objet, confiance)
10. Chemin du retour : Le retour commence mais tout n'est pas fini

**Acte 3 - Résolution**
11. Résurrection : Dernier test prouvant la transformation
12. Retour avec l'élixir : ${heroName} revient changé et apporte de la valeur aux autres

---

**Conseils importants :**
- Focus sur la transformation intérieure, pas seulement les événements
- L'épreuve centrale doit être émotionnellement forte
- Les enjeux doivent augmenter progressivement
- La fin doit apporter une vraie clôture émotionnelle
- Durée de lecture : environ 5-7 minutes`

  return prompt
}

export function StoryForm() {
  const [values, setValues] = useState<FormValues>({
    childAge: "",
    world: "",
    hero: "",
    challenge: "",
    helper: "",
    funElement: "",
    theme: "",
    ending: "",
  })
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Randomize on load
    setValues({
      childAge: getRandomOption(FORM_OPTIONS.childAge).value,
      world: getRandomOption(FORM_OPTIONS.world).value,
      hero: getRandomOption(FORM_OPTIONS.hero).value,
      challenge: getRandomOption(FORM_OPTIONS.challenge).value,
      helper: getRandomOption(FORM_OPTIONS.helper).value,
      funElement: getRandomOption(FORM_OPTIONS.funElement).value,
      theme: getRandomOption(FORM_OPTIONS.theme).value,
      ending: getRandomOption(FORM_OPTIONS.ending).value,
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
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Child Age */}
          <div className="space-y-2">
            <Label htmlFor="childAge" className="text-sm font-medium text-foreground">
              Âge de l&apos;enfant
            </Label>
            <Select value={values.childAge} onValueChange={(v) => updateValue("childAge", v)}>
              <SelectTrigger id="childAge" className="bg-card border-border">
                <SelectValue placeholder="Choisir..." />
              </SelectTrigger>
              <SelectContent>
                {FORM_OPTIONS.childAge.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* World */}
          <div className="space-y-2">
            <Label htmlFor="world" className="text-sm font-medium text-foreground">
              Univers 🌍
            </Label>
            <Select value={values.world} onValueChange={(v) => updateValue("world", v)}>
              <SelectTrigger id="world" className="bg-card border-border">
                <SelectValue placeholder="Choisir..." />
              </SelectTrigger>
              <SelectContent>
                {FORM_OPTIONS.world.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hero */}
          <div className="space-y-2">
            <Label htmlFor="hero" className="text-sm font-medium text-foreground">
              Héros 🧑‍🚀
            </Label>
            <Select value={values.hero} onValueChange={(v) => updateValue("hero", v)}>
              <SelectTrigger id="hero" className="bg-card border-border">
                <SelectValue placeholder="Choisir..." />
              </SelectTrigger>
              <SelectContent>
                {FORM_OPTIONS.hero.map((opt) => (
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
              Défi 🌑
            </Label>
            <Select value={values.challenge} onValueChange={(v) => updateValue("challenge", v)}>
              <SelectTrigger id="challenge" className="bg-card border-border">
                <SelectValue placeholder="Choisir..." />
              </SelectTrigger>
              <SelectContent>
                {FORM_OPTIONS.challenge.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Helper */}
          <div className="space-y-2">
            <Label htmlFor="helper" className="text-sm font-medium text-foreground">
              Mentor 🧙
            </Label>
            <Select value={values.helper} onValueChange={(v) => updateValue("helper", v)}>
              <SelectTrigger id="helper" className="bg-card border-border">
                <SelectValue placeholder="Choisir..." />
              </SelectTrigger>
              <SelectContent>
                {FORM_OPTIONS.helper.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fun Element */}
          <div className="space-y-2">
            <Label htmlFor="funElement" className="text-sm font-medium text-foreground">
              Élément amusant 🎭
            </Label>
            <Select value={values.funElement} onValueChange={(v) => updateValue("funElement", v)}>
              <SelectTrigger id="funElement" className="bg-card border-border">
                <SelectValue placeholder="Choisir..." />
              </SelectTrigger>
              <SelectContent>
                {FORM_OPTIONS.funElement.map((opt) => (
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
              Thème ❤️
            </Label>
            <Select value={values.theme} onValueChange={(v) => updateValue("theme", v)}>
              <SelectTrigger id="theme" className="bg-card border-border">
                <SelectValue placeholder="Choisir..." />
              </SelectTrigger>
              <SelectContent>
                {FORM_OPTIONS.theme.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ending */}
          <div className="space-y-2">
            <Label htmlFor="ending" className="text-sm font-medium text-foreground">
              Fin 🌙
            </Label>
            <Select value={values.ending} onValueChange={(v) => updateValue("ending", v)}>
              <SelectTrigger id="ending" className="bg-card border-border">
                <SelectValue placeholder="Choisir..." />
              </SelectTrigger>
              <SelectContent>
                {FORM_OPTIONS.ending.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Générer le prompt
        </Button>
      </form>

      {generatedPrompt && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Votre prompt :</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="border-border hover:bg-secondary"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copier
                </>
              )}
            </Button>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
              {generatedPrompt}
            </pre>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Copiez ce prompt et collez-le dans votre IA préférée (ChatGPT, Claude, Mistral...)
          </p>
        </div>
      )}
    </div>
  )
}
