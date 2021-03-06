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

var yaEnteralSolution = {
    Standard : {               // Standard: do not delete this entry
        Carbohydrates : 19,    // Carbohydrates in g/100ml
        Protein       : 6,     // Protein in g/100ml
        Fat           : 6,     // Fat in g/100ml
        Energy        : 1.54,  // Energy in kcal/ml
        WaterQuota    : 78,    // Water quota in %
        MaxRate       : 140    // Maximum supply rate in ml/h
    },
    Nutrison: {
        Carbohydrates : 12.3,
        Protein       : 4.0,
        Fat           : 3.9,
        Energy        : 1.0,
        WaterQuota    : 85,
        MaxRate       : 140
    },
    NutrisonE: {
        Carbohydrates : 18.5,
        Protein       : 6.0,
        Fat           : 5.8,
        Energy        : 1.5,
        WaterQuota    : 78,
        MaxRate       : 140
    },
    NutrisonPP: {
        Carbohydrates : 14.2,
        Protein       : 6.3,
        Fat           : 4.9,
        Energy        : 1.25,
        WaterQuota    : 81,
        MaxRate       : 140
    },
    NutrisonC: {
        Carbohydrates : 15.0,
        Protein       : 5.5,
        Fat           : 4.3,
        Energy        : 1.2,
        WaterQuota    : 80,
        MaxRate       : 140
    },
    NutrisonMF: {
        Carbohydrates : 12.3,
        Protein       : 4.0,
        Fat           : 3.9,
        Energy        : 1.0,
        WaterQuota    : 84,
        MaxRate       : 140
    },
    NutrisonEMF: {
        Carbohydrates : 18.5,
        Protein       : 6.0,
        Fat           : 5.8,
        Energy        : 1.5,
        WaterQuota    : 77,
        MaxRate       : 140
    },
    NutrisonPPMF: {
        Carbohydrates : 14.1,
        Protein       : 6.3,
        Fat           : 4.9,
        Energy        : 1.25,
        WaterQuota    : 80,
        MaxRate       : 140
    },
    Cubison: {
        Carbohydrates : 12.5,
        Protein       : 5.5,
        Fat           : 3.3,
        Energy        : 1.0,
        WaterQuota    : 84,
        MaxRate       : 140
    },
    Peptisorb: {
        Carbohydrates : 17.6,
        Protein       : 4.0,
        Fat           : 1.7,
        Energy        : 1.0,
        WaterQuota    : 84,
        MaxRate       : 140
    },
    NutrisonConc: {
        Carbohydrates : 20.1,
        Protein       : 7.5,
        Fat           : 10.0,
        Energy        : 2.0,
        WaterQuota    : 71,
        MaxRate       : 140
    },
    Osmolite: {
        Carbohydrates : 13.6,
        Protein       : 4.0,
        Fat           : 3.4,
        Energy        : 1.0,
        WaterQuota    : 85,
        MaxRate       : 140
    },
    OsmoliteBS: {
        Carbohydrates : 12.2,
        Protein       : 4.0,
        Fat           : 3.4,
        Energy        : 1.0,
        WaterQuota    : 85,
        MaxRate       : 140
    },
    OsmolitePlus: {
        Carbohydrates : 15.8,
        Protein       : 5.6,
        Fat           : 3.9,
        Energy        : 1.2,
        WaterQuota    : 82,
        MaxRate       : 140
    },
    OsmoliteHiCal: {
        Carbohydrates : 20.4,
        Protein       : 6.3,
        Fat           : 4.9,
        Energy        : 1.5,
        WaterQuota    : 77,
        MaxRate       : 140
    },
    Pulmocare: {
        Carbohydrates : 10.6,
        Protein       : 6.25,
        Fat           : 9.3,
        Energy        : 1.5,
        WaterQuota    : 79,
        MaxRate       : 140
    },
    Suplena: {
        Carbohydrates : 25.5,
        Protein       : 3.0,
        Fat           : 9.6,
        Energy        : 2.0,
        WaterQuota    : 70,
        MaxRate       : 140
    },
    Oxepa: {
        Carbohydrates : 10.6,
        Protein       : 6.25,
        Fat           : 9.4,
        Energy        : 1.52,
        WaterQuota    : 79,
        MaxRate       : 140
    },
    Jevity: {
        Carbohydrates : 14.1,
        Protein       : 4.0,
        Fat           : 3.5,
        Energy        : 1.0,
        WaterQuota    : 83,
        MaxRate       : 140
    },
    JevityPlus: {
        Carbohydrates : 15.1,
        Protein       : 5.6,
        Fat           : 3.9,
        Energy        : 1.2,
        WaterQuota    : 81,
        MaxRate       : 140
    },
    JevityHiCal: {
        Carbohydrates : 20.1,
        Protein       : 6.38,
        Fat           : 4.9,
        Energy        : 1.52,
        WaterQuota    : 76,
        MaxRate       : 140
    },
    NeproAbbott: {
        Carbohydrates : 20.6,
        Protein       : 7.0,
        Fat           : 20.6,
        Energy        : 2.0,
        WaterQuota    : 72,
        MaxRate       : 140
    },
    FresubinO : {
        Carbohydrates : 13.8,
        Protein       : 3.8,
        Fat           : 3.4,
        Energy        : 1.0,
        WaterQuota    : 84,
        MaxRate       : 140
    },
    FresubinOF : {
        Carbohydrates : 13.8,
        Protein       : 3.8,
        Fat           : 3.4,
        Energy        : 1.0,
        WaterQuota    : 84,
        MaxRate       : 140
    },
    FresubinE : {
        Carbohydrates : 18.8,
        Protein       : 5.6,
        Fat           : 5.8,
        Energy        : 1.5,
        WaterQuota    : 78,
        MaxRate       : 140
    },
    FresubinEF : {
        Carbohydrates : 18.8,
        Protein       : 5.6,
        Fat           : 5.8,
        Energy        : 1.5,
        WaterQuota    : 78,
        MaxRate       : 140
    },
    FresubinHPE : {
        Carbohydrates : 17.0,
        Protein       : 7.5,
        Fat           : 5.8,
        Energy        : 1.5,
        WaterQuota    : 79,
        MaxRate       : 140
    },
    SurvimedOPD : {
        Carbohydrates : 15.0,
        Protein       : 4.5,
        Fat           : 2.6,
        Energy        : 1.0,
        WaterQuota    : 84,
        MaxRate       : 140
    },
    Diben : {
        Carbohydrates : 9.25,
        Protein       : 4.5,
        Fat           : 5.0,
        Energy        : 1.0,
        WaterQuota    : 83,
        MaxRate       : 140
    },
    FresubinSojaF : {
        Carbohydrates : 13.3,
        Protein       : 3.8,
        Fat           : 3.6,
        Energy        : 1.0,
        WaterQuota    : 83,
        MaxRate       : 140
    },
    Renamil400 : {
        Carbohydrates : 15.4,
        Protein       : 1.0,
        Fat           : 4.2,
        Energy        : 1.0,
        WaterQuota    : 87,
        MaxRate       : 140
    },
    Renamil260 : {
        Carbohydrates : 22.1,
        Protein       : 1.44,
        Fat           : 6.0,
        Energy        : 1.5,
        WaterQuota    : 81,
        MaxRate       : 140
    },
    Renamil180 : {
        Carbohydrates : 29.5,
        Protein       : 1.92,
        Fat           : 8.0,
        Energy        : 2.0,
        WaterQuota    : 75,
        MaxRate       : 140
    },
    NovaImpact: {
        Carbohydrates : 13.4,
        Protein       : 5.6,
        Fat           : 2.8,
        Energy        : 1.01,
        WaterQuota    : 85,
        MaxRate       : 140
    },
    NovaImpactG: {
        Carbohydrates : 14.5,
        Protein       : 6.3,
        Fat           : 3.0,
        Energy        : 1.1,
        WaterQuota    : 80,
        MaxRate       : 140
    },
    Isosource: {
        Carbohydrates : 14.2,
        Protein       : 4.1,
        Fat           : 3.5,
        Energy        : 1.05,
        WaterQuota    : 84,
        MaxRate       : 140
    },
    IsosourceF: {
        Carbohydrates : 13.6,
        Protein       : 3.8,
        Fat           : 3.4,
        Energy        : 1.0,
        WaterQuota    : 84,
        MaxRate       : 140
    },
    IsosourceE: {
        Carbohydrates : 20.0,
        Protein       : 5.7,
        Fat           : 6.3,
        Energy        : 1.59,
        WaterQuota    : 76,
        MaxRate       : 140
    },
    IsosourceEF: {
        Carbohydrates : 20.2,
        Protein       : 4.9,
        Fat           : 5.5,
        Energy        : 1.5,
        WaterQuota    : 76,
        MaxRate       : 140
    },
    IsosourceP: {
        Carbohydrates : 12.6,
        Protein       : 6.6,
        Fat           : 4.0,
        Energy        : 1.13,
        WaterQuota    : 82,
        MaxRate       : 140
    }
};

