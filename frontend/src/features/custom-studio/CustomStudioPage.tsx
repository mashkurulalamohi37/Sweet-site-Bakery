import React, { useState } from 'react';
import {
  Wand2,
  Sparkles,
  Check,
  ShoppingBag,
  MessageCircle,
  Upload,
  ArrowRight,
  ArrowLeft,
  Cake,
  Palette,
  Layers,
  Heart,
  HelpCircle,
} from 'lucide-react';
import { formatBDT, getWhatsAppLink } from '../../utils/formatters';
import { useCartStore } from '../../store/cartStore';

export const CustomStudioPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { addItem, openCart } = useCartStore();

  // Customization State
  const [sponge, setSponge] = useState<string>('belgian_dark_chocolate');
  const [frosting, setFrosting] = useState<string>('white_chocolate_truffle');
  const [sizeTier, setSizeTier] = useState<number>(2); // in lbs
  const [theme, setTheme] = useState<string>('golden_royalty');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['gold_leaf']);
  const [inscription, setInscription] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [referencePhoto, setReferencePhoto] = useState<string | null>(null);

  // Options Data
  const spongeOptions = [
    { id: 'belgian_dark_chocolate', name: 'Belgian Dark Chocolate', price: 950, desc: 'Ultra-moist, 70% cocoa sponge' },
    { id: 'french_vanilla', name: 'French Vanilla Bean', price: 850, desc: 'Fragrant Madagascar vanilla sponge' },
    { id: 'red_velvet', name: 'Red Velvet Supreme', price: 900, desc: 'Classic velvety crimson cocoa blend' },
    { id: 'roshmalai_sponge', name: 'Roshmalai Cardamom Infusion', price: 950, desc: 'Traditional kheer soaked luxury' },
    { id: 'lotus_biscoff_sponge', name: 'Lotus Biscoff Spiced', price: 1050, desc: 'Caramelized Belgian cookie crumbles' },
    { id: 'pistachio_rose', name: 'Pistachio Persian Rose', price: 1100, desc: 'Crushed pistachio & rosewater essence' },
  ];

  const frostingOptions = [
    { id: 'white_chocolate_truffle', name: 'White Chocolate Truffle', price: 200, desc: '100% white chocolate melted frosting' },
    { id: 'ever_whipped_vanilla', name: 'Ever-Whipped Silk Cream', price: 100, desc: 'Light, airy, stabilized frosting' },
    { id: 'nutella_ganache', name: 'Nutella Hazelnut Ganache', price: 250, desc: 'Rich roasted hazelnut chocolate coat' },
    { id: 'salted_caramel_whip', name: 'Salted Butter Caramel', price: 180, desc: 'Slow-cooked golden dulce de leche' },
    { id: 'cream_cheese_velvet', name: 'Royal Cream Cheese Frosting', price: 220, desc: 'Tangy, creamy NYC-bakery style' },
  ];

  const sizeOptions = [
    { lbs: 1, name: '1.0 Lb (Single Tier)', serves: '4-6 Servings', multiplier: 1 },
    { lbs: 2, name: '2.0 Lb (Single Tier)', serves: '8-12 Servings', multiplier: 1.9 },
    { lbs: 3, name: '3.0 Lb (2-Tier Celebration)', serves: '14-18 Servings', multiplier: 2.8 },
    { lbs: 4, name: '4.0 Lb (2-Tier Grand Gala)', serves: '20-25 Servings', multiplier: 3.7 },
  ];

  const themeOptions = [
    { id: 'golden_royalty', name: 'Golden Royalty & Chocolate', color: 'from-amber-600 to-yellow-400' },
    { id: 'pastel_lavender', name: 'Soft Lavender & Blush Dream', color: 'from-purple-400 to-pink-300' },
    { id: 'minimalist_korean', name: 'Minimalist Korean Bento Aesthetic', color: 'from-stone-200 to-amber-100' },
    { id: 'romantic_crimson', name: 'Romantic Crimson & Red Velvet', color: 'from-rose-600 to-red-400' },
    { id: 'botanical_garden', name: 'Botanical Floral & White Pearl', color: 'from-emerald-400 to-teal-200' },
  ];

  const addonOptions = [
    { id: 'gold_leaf', name: '24K Edible Gold Foil Accents', price: 150 },
    { id: 'ferrero_crown', name: 'Ferrero Rocher Chocolate Crown (4 pcs)', price: 250 },
    { id: 'fresh_berries', name: 'Fresh Imported Strawberries & Berries', price: 300 },
    { id: 'french_macarons', name: 'Assorted French Macarons (4 pcs)', price: 220 },
    { id: 'sparkler_candle', name: 'Grand Celebration Sparkler Candle', price: 80 },
  ];

  // Price Calculation
  const selectedSpongeObj = spongeOptions.find((s) => s.id === sponge) || spongeOptions[0];
  const selectedFrostingObj = frostingOptions.find((f) => f.id === frosting) || frostingOptions[0];
  const selectedSizeObj = sizeOptions.find((s) => s.lbs === sizeTier) || sizeOptions[1];

  const baseCakeCost = (selectedSpongeObj.price + selectedFrostingObj.price) * (selectedSizeObj.multiplier * 0.9);
  const addonsCost = selectedAddons.reduce((sum, addonId) => {
    const item = addonOptions.find((a) => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);

  const calculatedTotal = Math.round(baseCakeCost + addonsCost);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferencePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCustomToCart = () => {
    const customProduct = {
      id: 9999,
      name: `Custom Studio Dream Cake (${sizeTier} Lb)`,
      slug: 'custom-dream-cake',
      description: `Custom ${selectedSpongeObj.name} with ${selectedFrostingObj.name} and ${themeOptions.find((t) => t.id === theme)?.name}.`,
      price: calculatedTotal,
      category: 'custom_cake' as any,
      image_url: '/assets/cakes/chocolate_overload_cake.jpg',
      is_bestseller: false,
      is_featured: true,
      rating: 5.0,
      reviews_count: 1,
      base_weight_lbs: sizeTier,
    };

    addItem(customProduct, 1, sizeTier, {
      sponge_base: selectedSpongeObj.name,
      frosting: selectedFrostingObj.name,
      design_theme: themeOptions.find((t) => t.id === theme)?.name,
      selected_addons: selectedAddons,
      inscription_text: inscription,
      special_instructions: specialInstructions,
      reference_photo: referencePhoto || undefined,
    });

    openCart();
  };

  const handleWhatsAppConsultation = () => {
    const msg = `Assalamu Alaikum Sweet Site Bakery! 🎂✨\n\nI designed a Custom Dream Cake on your Custom Studio:\n- *Size:* ${sizeTier} Lb (${selectedSizeObj.serves})\n- *Sponge Base:* ${selectedSpongeObj.name}\n- *Frosting:* ${selectedFrostingObj.name}\n- *Theme:* ${themeOptions.find((t) => t.id === theme)?.name}\n- *Add-ons:* ${selectedAddons.join(', ') || 'None'}\n- *Inscription:* "${inscription || 'None'}"\n- *Notes:* ${specialInstructions || 'None'}\n- *Estimated Quote:* ${formatBDT(calculatedTotal)}\n\nCan you confirm delivery and baking schedule in Rangpur?`;
    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="bg-brand-cream/30 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 bg-brand-brown text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
            <Wand2 className="w-3.5 h-3.5 text-brand-accent" />
            <span>Interactive Custom Cake Studio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-brand-brown">
            Design Your Dream Cake
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted">
            Craft your bespoke celebration cake step-by-step with authentic homemade ingredients & live price calculation.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-brand-brown/10">
          <div className="grid grid-cols-6 gap-2">
            {[
              { num: 1, label: 'Sponge' },
              { num: 2, label: 'Frosting' },
              { num: 3, label: 'Size' },
              { num: 4, label: 'Aesthetic' },
              { num: 5, label: 'Add-ons' },
              { num: 6, label: 'Quote' },
            ].map((step) => (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all ${
                  currentStep === step.num
                    ? 'bg-brand-brown text-white shadow-md'
                    : currentStep > step.num
                    ? 'bg-green-50 text-green-800'
                    : 'bg-brand-cream/40 text-brand-muted'
                }`}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border border-current">
                  {currentStep > step.num ? '✓' : step.num}
                </span>
                <span className="text-[10px] font-semibold hidden sm:inline">{step.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Studio Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Customizer Area */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-brand-brown/10 min-h-[480px] flex flex-col justify-between">
            {/* Step 1: Sponge Base */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="border-b border-brand-brown/10 pb-3">
                  <h3 className="font-serif text-2xl font-bold text-brand-brown flex items-center gap-2">
                    <Cake className="w-5 h-5 text-brand-accent" /> Step 1: Select Your Sponge Base
                  </h3>
                  <p className="text-xs text-brand-muted mt-1">
                    All sponges are baked with 100% homemade butter and no artificial premixes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {spongeOptions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSponge(s.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        sponge === s.id
                          ? 'border-brand-brown bg-brand-cream/40 ring-2 ring-brand-brown shadow-sm'
                          : 'border-brand-brown/10 hover:border-brand-brown/30 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-base text-brand-brown">{s.name}</h4>
                        <span className="text-xs font-bold text-brand-brown">৳{s.price}</span>
                      </div>
                      <p className="text-xs text-brand-muted mt-1">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Frosting & Whip */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="border-b border-brand-brown/10 pb-3">
                  <h3 className="font-serif text-2xl font-bold text-brand-brown flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-accent" /> Step 2: Select Royal Frosting
                  </h3>
                  <p className="text-xs text-brand-muted mt-1">
                    Silky Ever-Whipped cream, white chocolate, and Belgian chocolate ganache options.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {frostingOptions.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFrosting(f.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        frosting === f.id
                          ? 'border-brand-brown bg-brand-cream/40 ring-2 ring-brand-brown shadow-sm'
                          : 'border-brand-brown/10 hover:border-brand-brown/30 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-base text-brand-brown">{f.name}</h4>
                        <span className="text-xs font-bold text-brand-brown">+৳{f.price}</span>
                      </div>
                      <p className="text-xs text-brand-muted mt-1">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Size & Tiers */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="border-b border-brand-brown/10 pb-3">
                  <h3 className="font-serif text-2xl font-bold text-brand-brown flex items-center gap-2">
                    <Layers className="w-5 h-5 text-brand-accent" /> Step 3: Choose Size & Tiers
                  </h3>
                  <p className="text-xs text-brand-muted mt-1">
                    Calculated for optimal serving portions and tier structural balance.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {sizeOptions.map((sz) => (
                    <button
                      key={sz.lbs}
                      onClick={() => setSizeTier(sz.lbs)}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        sizeTier === sz.lbs
                          ? 'border-brand-brown bg-brand-cream/40 ring-2 ring-brand-brown shadow-sm'
                          : 'border-brand-brown/10 hover:border-brand-brown/30 bg-white'
                      }`}
                    >
                      <h4 className="font-serif font-bold text-lg text-brand-brown">{sz.name}</h4>
                      <p className="text-xs text-brand-accent font-semibold mt-1">{sz.serves}</p>
                      <p className="text-[11px] text-brand-muted mt-1">
                        Scale Multiplier: {sz.multiplier}x
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Aesthetic Theme & Palette */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-fade-in">
                <div className="border-b border-brand-brown/10 pb-3">
                  <h3 className="font-serif text-2xl font-bold text-brand-brown flex items-center gap-2">
                    <Palette className="w-5 h-5 text-brand-accent" /> Step 4: Aesthetic Palette & Theme
                  </h3>
                  <p className="text-xs text-brand-muted mt-1">
                    Choose the visual mood of your cake finish.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {themeOptions.map((th) => (
                    <button
                      key={th.id}
                      onClick={() => setTheme(th.id)}
                      className={`w-full p-4 rounded-2xl border flex items-center justify-between text-left transition-all ${
                        theme === th.id
                          ? 'border-brand-brown bg-brand-cream/40 ring-2 ring-brand-brown shadow-sm'
                          : 'border-brand-brown/10 hover:border-brand-brown/30 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${th.color} shadow-inner`} />
                        <h4 className="font-serif font-bold text-base text-brand-brown">{th.name}</h4>
                      </div>
                      {theme === th.id && <Check className="w-5 h-5 text-brand-brown" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Add-ons & Toppings */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-fade-in">
                <div className="border-b border-brand-brown/10 pb-3">
                  <h3 className="font-serif text-2xl font-bold text-brand-brown flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-accent" /> Step 5: Premium Add-ons & Crown
                  </h3>
                  <p className="text-xs text-brand-muted mt-1">
                    Elevate your cake with edible gold foil, chocolates, and sparklers.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {addonOptions.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-full p-4 rounded-2xl border flex items-center justify-between text-left transition-all ${
                          isSelected
                            ? 'border-brand-brown bg-brand-cream/40 ring-2 ring-brand-brown shadow-sm'
                            : 'border-brand-brown/10 hover:border-brand-brown/30 bg-white'
                        }`}
                      >
                        <div>
                          <h4 className="font-serif font-bold text-sm text-brand-brown">{addon.name}</h4>
                          <span className="text-xs font-semibold text-brand-accent">+৳{addon.price}</span>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-brand-brown text-white border-brand-brown' : 'border-brand-brown/30'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 6: Review, Photo Upload & Quote */}
            {currentStep === 6 && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-brand-brown/10 pb-3">
                  <h3 className="font-serif text-2xl font-bold text-brand-brown flex items-center gap-2">
                    <Heart className="w-5 h-5 text-brand-accent" /> Step 6: Inscription, Reference & Quote
                  </h3>
                  <p className="text-xs text-brand-muted mt-1">
                    Add custom piping messages and upload inspirational photos for our head baker.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1.5">
                      Piping Message on Cake Board / Top
                    </label>
                    <input
                      type="text"
                      value={inscription}
                      onChange={(e) => setInscription(e.target.value)}
                      placeholder="e.g. Happy 10th Birthday Aayan! 🎂"
                      maxLength={60}
                      className="w-full text-xs px-4 py-3 rounded-2xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1.5">
                      Special Baking Instructions
                    </label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      rows={2}
                      placeholder="e.g., Less sugar, extra white chocolate drip, deliver before 6 PM..."
                      className="w-full text-xs px-4 py-3 rounded-2xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1.5">
                      Upload Reference Design Image (Optional)
                    </label>
                    <div className="border-2 border-dashed border-brand-brown/20 rounded-2xl p-4 text-center hover:bg-brand-cream/20 transition-colors relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {referencePhoto ? (
                        <div className="flex items-center justify-center gap-3">
                          <img
                            src={referencePhoto}
                            alt="Reference"
                            className="w-16 h-16 object-cover rounded-xl border border-brand-brown/20"
                          />
                          <p className="text-xs text-green-700 font-bold">Image Attached Successfully! (Click to replace)</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-brand-muted">
                          <Upload className="w-6 h-6 text-brand-brown/50" />
                          <p className="text-xs font-semibold text-brand-brown">Click to upload reference image</p>
                          <p className="text-[10px]">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons between steps */}
            <div className="pt-6 mt-6 border-t border-brand-brown/10 flex items-center justify-between">
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  currentStep === 1
                    ? 'opacity-40 cursor-not-allowed text-brand-muted'
                    : 'text-brand-brown hover:bg-brand-cream'
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              {currentStep < 6 ? (
                <button
                  onClick={() => setCurrentStep((prev) => Math.min(6, prev + 1))}
                  className="px-6 py-2.5 rounded-xl bg-brand-brown hover:bg-brand-brown-light text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-xs font-bold text-brand-brown">Ready to Order</span>
              )}
            </div>
          </div>

          {/* Right Live Summary & Quote Widget */}
          <div className="lg:col-span-4 bg-brand-brown text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                  Live Custom Quote
                </span>
                <h3 className="font-serif text-2xl font-bold mt-0.5">Your Custom Recipe</h3>
              </div>

              <div className="space-y-3 text-xs text-brand-lavender">
                <div className="flex justify-between">
                  <span className="text-white/70">Sponge:</span>
                  <span className="font-semibold text-white text-right">{selectedSpongeObj.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Frosting:</span>
                  <span className="font-semibold text-white text-right">{selectedFrostingObj.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Size:</span>
                  <span className="font-semibold text-white text-right">{selectedSizeObj.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Theme:</span>
                  <span className="font-semibold text-white text-right">
                    {themeOptions.find((t) => t.id === theme)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Add-ons ({selectedAddons.length}):</span>
                  <span className="font-semibold text-white text-right">{formatBDT(addonsCost)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-white/60 block uppercase tracking-wider">Estimated Total</span>
                  <span className="font-serif text-3xl font-bold text-brand-accent">
                    {formatBDT(calculatedTotal)}
                  </span>
                </div>
                <span className="text-[11px] text-brand-lavender">Rangpur Fresh Delivery</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-4">
              <button
                onClick={handleAddCustomToCart}
                className="w-full py-3.5 rounded-2xl bg-brand-accent hover:bg-brand-accent-hover text-brand-brown font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Custom Cake to Basket</span>
              </button>

              <button
                onClick={handleWhatsAppConsultation}
                className="w-full py-3 rounded-2xl bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consult Baker on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
