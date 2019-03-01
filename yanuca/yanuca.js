/**
   YaNuCa (Yet Another NUtrition CAlculator) Version 1.3

   (c) 2003-2013 Dominic König (nursix.org)

   Permission is hereby granted, free of charge, to any person obtaining a copy of
   this software and associated documentation files (the "Software"), to deal in
   the Software without restriction, including without limitation the rights to
   use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
   of the Software, and to permit persons to whom the Software is furnished to do
   so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   SOFTWARE.
*/

// Illness factor (must be in range 0.5...1.4)
var YA_ILLNESS_FACTOR = {
  CriticalInitial         : 0.5,  // Critical Illness, Initial Ebb-Phase
  CriticalHyperCatabolic  : 1.0,  // Critical Illness, Hypercatabolic Flow-Phase
  CriticalAnabolic        : 1.4,  // Critical Illness, Anabolic Flow-Phase
  NonCriticalPassive      : 1.1,  // Non-critical Illness, Scheduled Therapy
  NonCriticalActive       : 1.2,  // Non-critical Illness, Mobilisation Phase
  MinorStress             : 1.3,  // Agitation, Polytrauma, Prolonged Septic Complications
  MajorStress             : 1.4   // Severe Burn Injury, Brain Injury
};

// Manual range settings (the first entries are what is used with 'automatic')
var yaGlucoseRange = {
    Minima : new Array( 2.0, 1.0, 1.0 ),
    Maxima : new Array( 4.5, 3.0, 2.0 )
};

var yaProteinRange = {
    Minima    : new Array( 1.0, 0.6, 0.8, 1.0, 1.2, 1.5, 2.0 ),
    Standards : new Array( 1.2, 0.8, 1.0, 1.2, 1.5, 1.8, 2.2 ),
    Maxima    : new Array( 1.5, 1.0, 1.2, 1.5, 1.8, 2.1, 2.5 )
};

// Energy goals - if < 10, the automatically calculated requirements will be used instead
var yaEnergyGoals = new Array( 0, 10, 15, 20, 25, 30, 35, 40, 45 );

// Specific energy of macro-nutrients
var yaSpecEnergy = {
  Protein: 4.0,
  Glucose: 4.0,
  Lipid  : 10.0
};

// Oral intake levels (the first entry is for 'none')
var yaOralIntake = new Array ( 0, 250, 500, 1000 );

// typical relation of macro-nutrients in the oral nutrition
var yaOralNutrition = {
  Protein: 15,
  Glucose: 60,
  Lipid  : 25
};

// Other settings (TODO: comment these)
var yaProteinUtilisationLimit = 0.25;
var yaMaximumLipidSupply = 2.1;
var yaMaximumEnergyDeficit = 500;
var yaEnteralTolerance = 0.05;
var yaMaxEnergyDeficit = 100;
var yaStandardEnteralRate = new Array( 10, 25, 50, 75, 150 );
var yaMaxEnteralRate = 150;

// ****************************************************************************
// Global variables
//
var the_patient   = new Patient();
var the_nutrition = new Nutrition();

// ****************************************************************************
// Main function
//
function yanuca() {

    // Read patient data

    iSex     = parseFloat( document.Nutriform.iSex.value     );
    iAge     = parseFloat( document.Nutriform.iAge.value     );
    iSize    = parseFloat( document.Nutriform.iSize.value    );
    iShape   = parseFloat( document.Nutriform.iShape.value   );
    iWeight  = parseFloat( document.Nutriform.iWeight.value  );
    iTFactor = parseFloat( document.Nutriform.iTFactor.value );
    iIllness = document.Nutriform.iIllness.value;

    the_patient.update(iSex,iAge,iSize,iShape,iWeight,iTFactor,iIllness);

    // Read oral nutrition data

    iOralIntake = parseFloat( document.Nutriform.iOralIntake.value );

    the_nutrition.setOral( iOralIntake );

    // Read enteral nutrition settings

    iEnteralSolution = document.Nutriform.iEnteralSolution.value;
    iMaxRate         = parseFloat( document.Nutriform.iMaxRate.value );

    the_nutrition.setEnteral( iEnteralSolution, iMaxRate );

    // Read nutrition goals

    iEnergy  = parseFloat( document.Nutriform.iEnergy.value );
    iGIndex  = parseFloat( document.Nutriform.iGIndex.value );
    iGRange  = parseFloat( document.Nutriform.iGRange.value );
    iPRange  = parseFloat( document.Nutriform.iPRange.value );

    the_nutrition.setGoals( iEnergy, iGIndex, iGRange, iPRange );

    // Calculate nutrition

    the_nutrition.calculate( the_patient );

    // Update the document

    document.Nutriform.Weight.value = Math.round( the_nutrition.result.PatientWeight );

    document.Nutriform.Requirements.value = Math.round( the_nutrition.result.Requirements );

    document.Nutriform.PAbs.value = Math.round( the_nutrition.result.ProteinAbs );
    document.Nutriform.GAbs.value = Math.round( the_nutrition.result.GlucoseAbs );
    document.Nutriform.LAbs.value = Math.round( the_nutrition.result.LipidAbs   );

    document.Nutriform.PRel.value = Math.round( the_nutrition.result.ProteinRel*10.0 ) / 10.0;
    document.Nutriform.GRel.value = Math.round( the_nutrition.result.GlucoseRel*10.0 ) / 10.0;
    document.Nutriform.LRel.value = Math.round( the_nutrition.result.LipidRel  *10.0 ) / 10.0;

    document.Nutriform.SupplyAbs.value = Math.round( the_nutrition.result.SupplyAbs );
    document.Nutriform.SupplyRel.value = Math.round( the_nutrition.result.SupplyRel );

    for ( i=0; i<5; i++ ) {

        rIndex = "Level" + i + "Rate";
        wIndex = "Level" + i + "WaterQuota";
        pIndex = "Level" + i + "Portions";
        aIndex = "Level" + i + "A10";
        gIndex = "Level" + i + "G40";
        lIndex = "Level" + i + "L20";

        if ( i>0 ) {
            document.Nutriform[rIndex].value = Math.round(the_nutrition.enteral.Rate[i]);
            document.Nutriform[wIndex].value = Math.round(the_nutrition.enteral.WaterQuota[i]);
            document.Nutriform[pIndex].value = Math.round(the_nutrition.enteral.Portions[i]);
        }

        // mark portions in maximum level red if > 4
        if ( i>0 ) {
            selector = '[name='+pIndex+']';
            if ( Math.round(the_nutrition.enteral.Portions[i]) == 5 ) {
                $(selector).css('background-color','#ff7777');
            } else {
                $(selector).css('background-color','#ffffff');
            }
        }
        document.Nutriform[aIndex].value = Math.round(the_nutrition.parenteral.RateA10[i]);
        document.Nutriform[gIndex].value = Math.round(the_nutrition.parenteral.RateG40[i]);
        document.Nutriform[lIndex].value = Math.round(the_nutrition.parenteral.RateL20[i]);
    }
}

// ****************************************************************************
// Patient object prototype
//
function Patient() {

    this.sex = 1;          // sex, 0=female, 1=male
    this.age = 65;         // age in years
    this.size = 175;       // body length in cm
    this.bmi = 22;         // estimated body-mass-index
    this.weight = 80;      // real weight in kg (0, if unknown)
    this.illness = 1.0;    // illness stress factor (0.5..1.4)
    this.fever = 1.0;      // thermal stress factor (0.5..1.4)

    this.bmr = 0;          // basal metabolic rate in kcal/d
    this.emr = 0;          // escalated metabolic rate in kcal/d
}

// ******************************************
// Patient update function
//
Patient.prototype.update = function(sex, age, size, bmi, weight, fever, illness) {

    // minima/maxima

    var rBMRmin = 15; // minimum relative basal metabolic rate in kcal/kg*d
    var rBMRmax = 40; // maximum relative basal metabolic rate in kcal/kg*d

    var feverMin = 0.5;
    var feverMax = 1.4;
    var illnessMin = 0.5;
    var illnessMax = 1.4;

    // update base values

    this.sex = sex;
    this.age = age;
    this.size = size;
    this.bmi = bmi;
    this.weight = weight;
    this.fever = fever;

    this.illness = YA_ILLNESS_FACTOR[illness];
    if ( this.illness === undefined ) {
        this.illness = 1.0;
    }

    // correct stress factors - do we really need to do this?
    this.illness = Math.max(Math.min(this.illness, illnessMax), illnessMin);
    this.fever = Math.max(Math.min(this.fever, feverMax), feverMin);

    // Check/calculate weight
    if (this.weight < 30) {
        if (this.weight != 0) {
            this.weight = 30;
        } else {
            var correction = this.age/20.0; // correction of BMI for age
            this.weight = (this.bmi+correction)*(this.size/100.0)*(this.size/100.0);
        }
    }
    else if (this.weight > 250) {
        this.weight = 250;
    }

    // Calculate basal metabolic rate (after Harris and Benedict)
    this.bmr = 0;
    if (this.sex == "0") {
        this.bmr = 655.0 + 9.6 * this.weight + 1.8 * this.size - 4.7 * this.age;
    } else {
        this.bmr = 66.5 + 13.8 * this.weight + 5.0 * this.size - 6.8 * this.age;
    }

    // Calculate effective metabolic rate (for stress factors)

    var rBMR = this.bmr / this.weight; // relative basal metabolic rate

    // Maximum Stress Factor
    var sMax = feverMax * illnessMax;

    // Maximum Relative Effective Metabolic Rate in kcal/kg*d
    var rEMRmax = Math.min(47, rBMR * sMax);

    // Relative Basal Metabolic Rate
    var rBMR = Math.max(Math.min(this.bmr / this.weight, rBMRmax), rBMRmin);

    // Stress factors
    var s = this.illness * this.fever;
    var a = ((rEMRmax)-sMax*rBMR)/((-1)*(-sMax)*(sMax-1));
    var b = ((rEMRmax)-sMax*sMax*rBMR)/(sMax*(1-sMax));

    this.emr = (a * s * s + b * s) * this.weight;
}

// ****************************************************************************
// Nutrition object prototype
//
function Nutrition() {

    this.valid = false;

    this.oral = {
        Intake : 0
    };

    this.enteral = {
        Solution   : yaEnteralSolution['Standard'],
        MaxRate    : 0,
        Rate       : new Array( 0, 0, 0, 0, 0 ),  // Laufraten Sondenkost in ml/h
        WaterQuota : new Array( 0, 0, 0, 0, 0 ),  // Wasseranteil der Sondenkost in ml/h
        Portions   : new Array( 5, 5, 5, 5, 5 )   // Anzahl Portionen á 4h
    };

    this.parenteral = {
        RateA10 : new Array( 0, 0, 0, 0, 0 ),  // Laufrate Aminosre.lsg. 10% in ml/h
        RateG40 : new Array( 0, 0, 0, 0, 0 ),  // Laufrate Glucoselsg. 40% in ml/h
        RateL20 : new Array( 0, 0, 0, 0, 0 )   // Laufrate Fettemuls. 20% in ml/h
    };

    this.goals = {
        Energy : 0,
        ProteinRange: {
            Minimum:  0,
            Standard: 0,
            Maximum:  0
        },
        GlucoseRange: {
            Minimum:  0,
            Maximum:  0
        },
        GlucoseIndex: 0.25
    };

    this.result = {
        ProteinAbs: 0,
        ProteinRel: 0,
        GlucoseAbs: 0,
        GlucoseRel: 0,
        LipidAbs  : 0,
        LipidRel  : 0,
        SupplyAbs : 0,
        SupplyRel : 0,

        PatientWeight: 0,
        Requirements : 0
    };
}

// ****************************************************************************
// Validity test
//
Nutrition.prototype.isValid = function() {
    return( this.valid );
}

// ****************************************************************************
// Set oral intake level
//
Nutrition.prototype.setOral = function( level ) {

    this.valid = false;

    this.oral.Intake = yaOralIntake[level];
    if ( this.oral.Intake == undefined ) {
        this.oral.Intake = 0;
    }
}

// ****************************************************************************
// Set enteral solution
//
Nutrition.prototype.setEnteral = function( solution, maxrate ) {

    this.valid = false;

    this.enteral.Solution = yaEnteralSolution[solution];

    if ( this.enteral.Solution == undefined ) {
        this.enteral.Solution = yaEnteralSolution['Standard'];
    }

    if (maxrate <= 0 || maxrate > yaMaxEnteralRate) {
        this.enteral.MaxRate = this.enteral.Solution.Maxrate;
    } else {
        this.enteral.MaxRate = maxrate;
    }
}

// ****************************************************************************
// Set nutrition goals
//
Nutrition.prototype.setGoals = function( energy, glucIndex, glucRange, protRange ) {

    this.valid = false;

    this.goals.Energy = yaEnergyGoals[energy]; // goal = 0 means determined by requirements

    this.goals.GlucoseIndex = glucIndex; // index = 0 means automatic

    this.goals.GlucoseRange.Minimum = yaGlucoseRange.Minima[glucRange];
    this.goals.GlucoseRange.Maximum = yaGlucoseRange.Maxima[glucRange];

    this.goals.ProteinRange.Minimum  = yaProteinRange.Minima[protRange];
    this.goals.ProteinRange.Standard = yaProteinRange.Standards[protRange];
    this.goals.ProteinRange.Maximum  = yaProteinRange.Maxima[protRange];
}

// ****************************************************************************
// Calculate supply rates
//
Nutrition.prototype.calculate = function( patient ) {

    this.valid = false;

    var supply = patient.emr;

    if ( this.goals.Energy >= 10 ) {
        supply = patient.weight * this.goals.Energy;
    }

    var totEnergyP = this.goals.ProteinRange.Standard * patient.weight * yaSpecEnergy.Protein;

    var deficit = supply - totEnergyP;

    if ( this.goals.GlucoseIndex == 0 ) {
        this.goals.GlucoseIndex = ( this.enteral.Solution.Carbohydrates * yaSpecEnergy.Glucose ) /
                                 (( this.enteral.Solution.Energy * 100 ) -
                                  ( this.enteral.Solution.Protein * yaSpecEnergy.Protein ));
        if ( this.goals.GlucoseIndex < 0.30 || this.goals.GlucoseIndex > 0.80 ) {
            this.goals.GlucoseIndex = 0.65;
        }
    }


    var totEnergyG = deficit * this.goals.GlucoseIndex;
    var totEnergyL = deficit - totEnergyG;

    // Correction 1: ProteinUtilisationLimit

    if (( totEnergyP / supply ) > yaProteinUtilisationLimit ) {
        if ((( this.goals.ProteinRange.Minimum * patient.weight * yaSpecEnergy.Protein ) / supply ) > yaProteinUtilisationLimit ) {
            totEnergyP = this.goals.ProteinRange.Minimum * patient.weight * yaSpecEnergy.Protein;
            supply = totEnergyP / yaProteinUtilisationLimit;

        } else {
            totEnergyP = supply * yaProteinUtilisationLimit;
        }
    }

    deficit = supply - totEnergyP;

    // Correction 2: GlucoseMinimum

    var totEnergyGMin = this.goals.GlucoseRange.Minimum * patient.weight * yaSpecEnergy.Glucose;
    var totEnergyPMin = this.goals.ProteinRange.Minimum * patient.weight * yaSpecEnergy.Protein;

    if ( deficit < totEnergyGMin ) {
        if (( supply - totEnergyPMin  ) < totEnergyGMin ) {
            supply = totEnergyPMin + totEnergyGMin;
            totEnergyP = totEnergyPMin;
        } else {
            totEnergyP = supply - totEnergyGMin;
        }
    }

    deficit = supply - totEnergyP;

    // Correction 3: Maxmima

    var totEnergyLMax = yaMaximumLipidSupply * patient.weight * yaSpecEnergy.Lipid;
    var totEnergyGMax = this.goals.GlucoseRange.Maximum * patient.weight * yaSpecEnergy.Glucose;

    var totEnergyPMax = Math.min(( supply * yaProteinUtilisationLimit ),
                                 ( this.goals.ProteinRange.Maximum * patient.weight * yaSpecEnergy.Protein ));

    if ( totEnergyGMax < ( deficit * this.goals.GlucoseIndex )) {

        totEnergyP = Math.min(( supply - totEnergyGMax * ( 1/this.goals.GlucoseIndex )), totEnergyPMax );
        totEnergyG = totEnergyGMax;

        deficit = supply - totEnergyP - totEnergyG;

        if ( totEnergyLMax < deficit ) {

            if ( totEnergyP < totEnergyPMax ) {

                totEnergyP = Math.min( totEnergyPMax, ( totEnergyP + ( deficit - totEnergyLMax )));
                deficit = supply - totEnergyP - totEnergyG;
            }

            if (( totEnergyLMax < deficit ) && (( deficit - totEnergyLMax ) > yaMaxEnergyDeficit )) {

                yaAlertDeficit( Math.round( deficit - totEnergyLMax ));

                totEnergyL = totEnergyLMax;
                supply -= ( deficit - totEnergyLMax );

            } else {
                totEnergyL = deficit;
            }
        } else {
            totEnergyL = deficit;
        }
    } else {
        totEnergyG = Math.min( totEnergyGMax, deficit * this.goals.GlucoseIndex );

        if ( totEnergyG < totEnergyGMin ) {
            totEnergyG = totEnergyGMin;
        }

        deficit = supply - totEnergyP - totEnergyG;

        if ( deficit > totEnergyLMax ) {
            if (( totEnergyP + ( deficit - totEnergyLMax )) > totEnergyPMax ) {

                totEnergyP = totEnergyPMax;
                totEnergyL    = totEnergyLMax;

                deficit = supply - totEnergyP - totEnergyL;

                if (( deficit > totEnergyGMax ) && ( deficit > yaMaxEnergyDeficit )) {

                    yaAlertDeficit( Math.round( deficit - totEnergyGMax ));

                    totEnergyG = totEnergyGMax;
                    supply = totEnergyP + totEnergyG + totEnergyL;

                } else {
                    totEnergyG = deficit;
                }
            } else {
                totEnergyP += deficit - totEnergyLMax;
                totEnergyL = totEnergyLMax;
            }
        } else {
            totEnergyL = deficit;
        }
    }

    // Correction 4: Reduce for oral intake

    if ( this.oral.Intake > 0 ) {

        if (( supply - this.oral.Intake ) > yaMaximumEnergyDeficit ) {

            var prefsum = yaOralNutrition.Protein + yaOralNutrition.Glucose + yaOralNutrition.Lipid;

            var prf = yaOralNutrition.Protein / prefsum;
            var grf = yaOralNutrition.Glucose / prefsum;
            var lrf = yaOralNutrition.Lipid   / prefsum;

            if (( prf * this.oral.Intake ) > totEnergyP ) {
                totEnergyP = 0;
            } else {
                totEnergyP -= prf * this.oral.Intake;
            }

            if (( grf * this.oral.Intake ) > totEnergyG ) {
                totEnergyG = 0;
            } else {
                totEnergyG -= grf * this.oral.Intake;
            }

            if (( lrf * this.oral.Intake ) > totEnergyL ) {
                totEnergyL = 0;
            } else {
                totEnergyL -= lrf * this.oral.Intake;
            }

            supply = totEnergyP + totEnergyG + totEnergyL;

        } else {

            totEnergyP = 0;
            totEnergyG = 0;
            totEnergyL = 0;

            supply = 0;
        }
    }

    // Results

    this.result.ProteinAbs = totEnergyP / yaSpecEnergy.Protein;
    this.result.GlucoseAbs = totEnergyG / yaSpecEnergy.Glucose;
    this.result.LipidAbs   = totEnergyL / yaSpecEnergy.Lipid;

    this.result.ProteinRel = this.result.ProteinAbs / patient.weight;
    this.result.GlucoseRel = this.result.GlucoseAbs / patient.weight;
    this.result.LipidRel   = this.result.LipidAbs   / patient.weight;

    // TODO: do we really need these two?
    this.result.PatientWeight = patient.weight;
    this.result.Requirements  = patient.emr;

    this.result.SupplyAbs     = supply;
    this.result.SupplyRel     = supply / patient.weight;

    // dea = daily enteral amount

    var dea = {
        byEnergy : this.result.SupplyAbs  /  this.enteral.Solution.Energy,
        byProtein: this.result.ProteinAbs / (this.enteral.Solution.Protein / 100),
        byGlucose: this.result.GlucoseAbs / (this.enteral.Solution.Carbohydrates / 100)
    };

    dea.byEnergyMin = dea.byEnergy * ( 1 - yaEnteralTolerance );
    dea.byEnergyMax = dea.byEnergy * ( 1 + yaEnteralTolerance );

    dea.byProteinMin = dea.byProtein * ( 1 - yaEnteralTolerance );
    dea.byProteinMax = dea.byProtein * ( 1 + yaEnteralTolerance );
    dea.byGlucoseMin = dea.byGlucose * ( 1 - yaEnteralTolerance );
    dea.byGlucoseMax = dea.byGlucose * ( 1 + yaEnteralTolerance );

    dea.totalMax = Math.min(
                   Math.min( dea.byGlucoseMax, dea.byProteinMax ),
                   Math.min( dea.byGlucoseMax, dea.byEnergyMax ));

    if (( dea.byEnergyMin  > dea.totalMax ) ||
        ( dea.byProteinMin > dea.totalMax ) ||
        ( dea.byGlucoseMin > dea.totalMax )) {
        dea.total = dea.totalMax;
    } else {
        dea.totalMin = Math.max(
                       Math.max( dea.byEnergyMin, dea.byProteinMin ),
                       Math.max( dea.byEnergyMin, dea.byGlucoseMin ));

        dea.total = ( dea.totalMin + dea.totalMax ) / 2;
    }

    // calculate enteral rate

    var minRate  = 10; // TODO: make this a config value
    var maxRate  = Math.min( this.enteral.Solution.MaxRate, this.enteral.MaxRate );

    // calculate enteral rate of the maximum level

    var portions = 4;    // number of Portions
    var levels   = 5;    // number of Levels

    var maxLevelRate = Math.max( minRate, ( dea.total / ( portions * 4 )));

    // Correction for maximum rates
    if ( Math.round( maxLevelRate ) > maxRate ) {

        maxLevelRate = Math.max( minRate, ( maxLevelRate * 16 / 20 ));
        portions     = 5;

        if ( Math.round( maxLevelRate ) > maxRate ) {
            maxLevelRate = maxRate;
        }
    }

    // Calculation of rates
    for ( var i=0; i < levels; i++ ) {

        this.enteral.Rate[i] = yaStandardEnteralRate[i];

        // clear previous results (mandatory!)
        this.parenteral.RateA10[i] = 0;
        this.parenteral.RateG40[i] = 0;
        this.parenteral.RateL20[i] = 0;

        if ( this.enteral.Rate[i] > maxLevelRate ) {
            this.enteral.Rate[i]     = maxLevelRate;
            this.enteral.Portions[i] = portions;
        } else {
            this.enteral.Portions[i] = 4;
        }

        this.enteral.Portions[0] = 5; // always 5 in level 0!

        // round to next 5ml/h
        this.enteral.WaterQuota[i] =
            Math.round( this.enteral.Rate[i] * this.enteral.Solution.WaterQuota / 500 ) * 5;

        // real daily enteral amount (always assumed as 0 in level 0)
        if ( i > 0 ) {
            dea.real = this.enteral.Rate[i] * this.enteral.Portions[i] * 4;
        } else {
            dea.real = 0;
        }

        // Daily amounts of macro-nutrients in the enteral nutrition

        dea.protein = dea.real * ( this.enteral.Solution.Protein       / 100 );
        dea.glucose = dea.real * ( this.enteral.Solution.Carbohydrates / 100 );
        dea.lipid   = dea.real * ( this.enteral.Solution.Fat           / 100 );

        // Calculate deficits in the enteral nutrition
        var Deficit = {

            Protein : Math.max( 0, this.result.ProteinAbs - dea.protein ),
            Glucose : Math.max( 0, this.result.GlucoseAbs - dea.glucose ),
            Lipid   : Math.max( 0, this.result.LipidAbs   - dea.lipid   ),

            Energy  : Math.max( 0,
                        ( this.result.GlucoseAbs * yaSpecEnergy.Glucose +
                          this.result.LipidAbs   * yaSpecEnergy.Lipid     ) -
                        ( dea.glucose * yaSpecEnergy.Glucose +
                          dea.lipid   * yaSpecEnergy.Lipid   ))
        };

        // Add amino acids if necessary
        if (( Deficit.Protein > 0 ) &&
           (( Deficit.Protein / this.result.ProteinAbs ) > yaEnteralTolerance )) {

            this.parenteral.RateA10[i] = ( Deficit.Protein / 0.1 ) / 24;
        }

        // Energy deficit? (non-protein energy)
        if ( Deficit.Energy > yaMaxEnergyDeficit ) {

            // Add Glucose 40% first
            if ( Deficit.Glucose > 0 ) {
                this.parenteral.RateG40[i] =
                    Math.min(( Deficit.Glucose / 0.4 ) / 24,
                            (( Deficit.Energy / yaSpecEnergy.Glucose ) / 0.4 ) / 24 );
                Deficit.Energy =
                    Deficit.Energy - (( this.parenteral.RateG40[i] * 24 ) * 0.4 ) * yaSpecEnergy.Glucose;
            }

            // Add Lipid 20%, if still not enough energy
            if ( Deficit.Energy > 0 ) {
                this.parenteral.RateL20[i] =
                    Math.min(( Deficit.Lipid / 0.2 ) / 24,
                            (( Deficit.Energy / yaSpecEnergy.Lipid ) / 0.2 ) / 24 );
            }
        }
    }

    // set valid
    this.valid = true;
}

// ****************************************************************************
// END
// ****************************************************************************
