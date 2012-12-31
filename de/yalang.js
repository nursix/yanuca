// ****************************************************************************
// * YaNuCa Yet Another Nutrition Calculator                                  *
// * (c) 2003-2009 by Dominic König (nursix.org)                              *
// ****************************************************************************
// * yalang.js : Language dependent parts                                     *
// ****************************************************************************
// * This program is free software: you can redistribute it and/or modify     *
// * it under the terms of the GNU Affero General Public License as published *
// * by the Free Software Foundation, either version 3 of the License, or     *
// * (at your option) any later version.                                      *
// *                                                                          *
// * This program is distributed in the hope that it will be useful,          *
// * but WITHOUT ANY WARRANTY; without even the implied warranty of           *
// * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the            *
// * GNU Affero General Public License for more details.                      *
// *                                                                          *
// * You should have received a copy of the GNU Affero General Public License *
// * along with this program.  If not, see <http://www.gnu.org/licenses/>.    *
// *                                                                          *
// * For more information about nursix.org, please visit us at                *
// * my website at http://www.nursix.org                                      *
// ****************************************************************************

// ****************************************************************************
// yaAlertDeficit : Alert the user if there is a remaining energy deficit
//
// parameters: none
//
function yaAlertDeficit( deficit ) {

  alert("WARNUNG!\n\n" +
        "Maximal mögliche Einfuhrmengen decken den ermittelten Energiebedarf nicht:\n\n" +
        "Defizit trotz max. Zufuhr: " + Math.round( deficit ) + " kcal/d.");
}
