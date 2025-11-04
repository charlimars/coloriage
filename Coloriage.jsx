/*
═══════════════════════════════════════════════════════════════════
    COLORIAGE - Fast Coloring for Photoshop
    by Charlie Mars - www.charlie-mars.com
═══════════════════════════════════════════════════════════════════
    
    Description:
    Automates the flatting workflow for line art coloring.
    
    Workflow:
    1. Expand selection by 2px
    2. Create new layer
    3. Fill with foreground color
    4. Move new layer below original
    5. Merge layers (keeping original name)
    
    Usage:
    - Make a selection on your line art layer
    - Run this script
    - Done!
    
═══════════════════════════════════════════════════════════════════
*/

#target photoshop

// ═══════════════════════════════════════════════════════════════
// MAIN FUNCTION
// ═══════════════════════════════════════════════════════════════

function coloriage() {
    // Check if document exists
    if (app.documents.length === 0) {
        alert("Erreur : Aucun document ouvert.");
        return;
    }

    var doc = app.activeDocument;
    
    // Check if there's an active selection
    try {
        var bounds = doc.selection.bounds;
    } catch (e) {
        alert("Erreur : Aucune sélection active.\n\nVeuillez faire une sélection avant d'exécuter ce script.");
        return;
    }
    
    // Check if active layer is not background
    if (doc.activeLayer.isBackgroundLayer) {
        alert("Erreur : Le calque actif est l'arrière-plan.\n\nVeuillez sélectionner un calque normal.");
        return;
    }
    
    // Store original layer name and layer reference
    var originalLayer = doc.activeLayer;
    var originalLayerName = originalLayer.name;
    
    try {
        // ───────────────────────────────────────────────────────
        // STEP 1: Expand selection by 2 pixels
        // ───────────────────────────────────────────────────────
        doc.selection.expand(2);
        
        // ───────────────────────────────────────────────────────
        // STEP 2: Create new layer
        // ───────────────────────────────────────────────────────
        var newLayer = doc.artLayers.add();
        newLayer.name = "Color Fill"; // Temporary name
        
        // ───────────────────────────────────────────────────────
        // STEP 3: Fill with foreground color
        // ───────────────────────────────────────────────────────
        var fillColor = app.foregroundColor;
        doc.selection.fill(fillColor);
        
        // ───────────────────────────────────────────────────────
        // STEP 4: Move new layer below original
        // ───────────────────────────────────────────────────────
        newLayer.move(originalLayer, ElementPlacement.PLACEAFTER);
        
        // ───────────────────────────────────────────────────────
        // STEP 5: Select original layer (the one above)
        // ───────────────────────────────────────────────────────
        doc.activeLayer = originalLayer;
        
        // ───────────────────────────────────────────────────────
        // STEP 6: Merge with layer below and keep original name
        // ───────────────────────────────────────────────────────
        var mergedLayer = doc.activeLayer.merge();
        mergedLayer.name = originalLayerName;
        
        // Keep selection active for multiple passes
        
    } catch (e) {
        alert("Erreur pendant l'exécution :\n\n" + e.message);
    }
}

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS (if needed in the future)
// ═══════════════════════════════════════════════════════════════

/*
// Function to get layer above current layer (kept for reference)
function selectLayerAbove() {
    var doc = app.activeDocument;
    var activeLayer = doc.activeLayer;

    function getAllLayers(layerSet, collected) {
        for (var i = layerSet.layers.length - 1; i >= 0; i--) {
            var layer = layerSet.layers[i];
            collected.push(layer);
            if (layer.typename === "LayerSet") {
                getAllLayers(layer, collected);
            }
        }
    }

    var allLayers = [];
    getAllLayers(doc, allLayers);

    for (var i = 0; i < allLayers.length - 1; i++) {
        if (allLayers[i] === activeLayer) {
            doc.activeLayer = allLayers[i + 1];
            return;
        }
    }
    
    alert("Aucun calque au-dessus trouvé.");
}
*/

// ═══════════════════════════════════════════════════════════════
// EXECUTE
// ═══════════════════════════════════════════════════════════════

coloriage();
