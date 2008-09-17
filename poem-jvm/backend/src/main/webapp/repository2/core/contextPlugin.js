/**
 * Copyright (c) 2008
 * Bj�rn Wagner, Sven Wagner-Boysen
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 **/

Ext.namespace("Repository.Core");

Repository.Core.ContextPlugin = {
	/**
	 * 
	 */
	construct: function(facade) {
		// call Plugin constructor
		arguments.callee.$.construct.apply(this, arguments);
		
		this.panel = this.facade.registerPluginOnPanel({name : this.name});
		
		// register on events SectionChanged and ModelUpdate
		this.facade.registerOnSelectionChanged(this.selectionChanged.bind(this));
		this.facade.modelCache.getUpdateHandler().registerCallback(this.modelUpdate.bind(this));
		
	},
	selectionChanged : function(modelIds) {
		if (modelIds.length != 0) {
			this.facade.modelCache.getDataAsync(this.dataUris, modelIds, this.render.bind(this));
		} else {
			this.render(null); // Just clear the panel
		}
	},
	
	modelUpdate : function(modelId) {
		if (this.facade.getSelectedModels().indexOf(modelId) != -1) {
			var a = new Array();
			a.push(modelId);
			this.facade.modelCache.getDataAsync(this.dataUris, a, this.render.bind(this));
		}
	}
};

Repository.Core.ContextPlugin = Repository.Core.Plugin.extend(Repository.Core.ContextPlugin);
