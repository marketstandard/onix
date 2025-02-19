export enum ProcessingPhrasesThemes {
  Default,
  Nerdy,
  Roofing,
}

export const getProcessingPhrases = (theme: ProcessingPhrasesThemes) => {
  switch (theme) {
    case ProcessingPhrasesThemes.Default:
      return DEFAULT_PHRASES;
    case ProcessingPhrasesThemes.Roofing:
      return ROOFING_PHRASES;
    case ProcessingPhrasesThemes.Nerdy:
      return NERDY_PHRASES;
    default:
      return DEFAULT_PHRASES;
  }
};

const DEFAULT_PHRASES = [
  'Brewing a fresh cup of code...',
  'Feeding the hamsters...',
  'Spinning up the fun machine...',
  'Warming up the servers...',
  'Adding a pinch of magic...',
  'Tickling the pixels...',
  'Waking up the internet gnomes...',
  'Painting the screen...',
  'Charging the laughter batteries...',
  'Rounding up the bits and bytes...',
  'Polishing the buttons...',
  'Mixing the colors...',
  'Petting the cat...',
  'Stretching the cables...',
  'Sharpening the pencils...',
  'Rolling out the red carpet...',
  'Unwrapping the digital candy...',
  'Tuning the instruments...',
  'Adjusting the curtains...',
  'Inflating the balloons...',
  'Shuffling the deck...',
  'Testing the waters...',
  'Popping the popcorn...',
  'Rehearsing the dance moves...',
  'Flipping the pancakes...',
  'Brushing up the code...',
  'Sprinkling some fairy dust...',
  'Stirring the pot...',
  'Inflating the rubber duck...',
  'Lighting the candles...',
  'Polishing the pixels...',
  'Butterflying the code...',
  'Loading the fun truck...',
  'Tightening the screws...',
  'Booting up the giggles...',
];

const ROOFING_PHRASES = [
  'Nailing down the details...',
  'Laying the foundation...',
  'Measuring twice, cutting once...',
  'Hammering away...',
  'Tiling the roof...',
  'Checking for leaks...',
  'Securing the shingles...',
  'Rolling out the tar paper...',
  'Aligning the gutters...',
  'Sweeping the sawdust...',
  'Sealing the edges...',
  'Weatherproofing the project...',
  'Lifting the ladders...',
  'Painting the trim...',
  'Caulking the seams...',
  'Patching the holes...',
  'Leveling the beams...',
  'Installing the vents...',
  'Sanding the rough spots...',
  'Cleaning the tools...',
  'Clearing the debris...',
  'Stacking the materials...',
  'Setting up the scaffolding...',
  'Marking the measurements...',
  'Cutting the tiles...',
  'Flashing the edges...',
  'Stapling the underlayment...',
  'Adjusting the rafters...',
  'Aligning the trusses...',
  'Fastening the brackets...',
  'Checking the blueprints...',
  'Testing the insulation...',
  'Tuning the nail gun...',
  'Tarring the roof...',
  'Sweeping off the leaves...',
];

const NERDY_PHRASES = [
  'Compiling the multiverse...',
  'Reticulating splines...',
  'Aligning flux capacitors...',
  'Adjusting the space-time continuum...',
  'Buffering the quantum foam...',
  'Optimizing reality matrix...',
  'Entangling superstrings...',
  'Harmonizing resonance fields...',
  'Decrypting the Enigma...',
  'Initializing time warp sequence...',
  'Calibrating the TARDIS...',
  'Synthesizing dilithium crystals...',
  'Charging particle beam accelerators...',
  'Warping through hyperspace...',
  'Generating 1.21 gigawatts...',
  'Bending the fabric of space...',
  'Navigating the astral plane...',
  'Summoning digital daemons...',
  'Distilling the essence of geekiness...',
  'Unfolding the DNA helix...',
  'Simulating alternate realities...',
  'Constructing virtual Lego...',
  'Invoking the laws of thermodynamics...',
  'Decoding the Fibonacci sequence...',
  'Orchestrating a symphony of bits...',
  'Kessel Run in less than twelve parsecs...',
  'Avoiding Imperial entanglements...',
  'Tuning hyperdrive...',
  'Consulting the Jedi archives...',
  'Plotting a course to Dagobah...',
  'Preparing for lightspeed...',
  "Don't panic, loading the Guide...",
  'Calculating the answer to everything...',
  'Checking the Infinite Improbability Drive...',
  'Finding the best towel in the galaxy...',
  "Updating the Guide's entry for Earth...",
  'Avoiding Vogons and their poetry...',
  'Contacting Stargate command...',
  'Chevron 5 encoded...',
];

export const MAX_RESPONSE_TOKENS = 5000;

export const SIGNATURE_MESSAGE_FOR_KEY =
  'Please sign this message to generate a private key for Onix.chat. DO NOT SIGN THIS MESSAGE OUTSIDE OF THE ONIX.CHAT WEBSITE.';

export const ONIX_CHAT_FILE_EXTENSION = '.onix';
export const ONIX_INDEX_FILE_EXTENSION = '.ondx';
